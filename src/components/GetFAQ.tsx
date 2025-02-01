import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import "../utils/i18n";

const API_URL = 'http://localhost:5000/api/faqs/';

const GetFAQ: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState<string>('en');
  const [faqs, setFaqs] = useState<{ question: string, answer: string }[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const ITEMS_PER_PAGE = 3;

  useEffect(() => {
    const getFAQs = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}?lang=${language}`);
        const data = await response.json();
        setFaqs(data?.data || []);
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    getFAQs();
  }, [language]);

  const handleLanguageChange = (selectedOption: any) => {
    setLanguage(selectedOption.value);
    setCurrentPage(1);
  };

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'Hindi' },
    { value: 'bn', label: 'Bengali' },
    { value: 'de', label: 'German' },
    { value: 'fr', label: 'French' },
  ];

  const customSelectStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      border: state.isFocused ? '1px solid #94a3b8' : '1px solid #cbd5e1',
      borderRadius: '6px',
      padding: '2px',
      boxShadow: 'none',
      backgroundColor: '#f8fafc',
      '&:hover': {
        border: '1px solid #94a3b8',
      }
    }),
    option: (provided: any, state: { isSelected: boolean }) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#475569' : 'white',
      color: state.isSelected ? 'white' : '#334155',
      '&:hover': {
        backgroundColor: state.isSelected ? '#475569' : '#f1f5f9',
      }
    }),
    menu: (provided: any) => ({
      ...provided,
      borderRadius: '6px',
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    })
  };

  const displayedFAQs = faqs.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="bg-slate-50 min-h-screen py-12 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-1">Help Center</h1>
          <p className="text-slate-600">Find answers to commonly asked questions</p>
        </div>

        <div className="mb-10">
          <label className="block text-sm text-slate-600 mb-2">
            Choose your language
          </label>
          <Select
            options={languageOptions}
            onChange={handleLanguageChange}
            defaultValue={languageOptions[0]}
            styles={customSelectStyles}
            isSearchable={false}
            className="w-48"
          />
        </div>

        {loading ? (
          <div className="py-32 text-center">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-slate-600 border-t-transparent"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {displayedFAQs.map((faq, index) => (
              <div 
                key={index} 
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300"
              >
                <h3 className="text-lg font-medium text-slate-800 mb-3">
                  {faq.question}
                </h3>
                <div
                  className="ck-content"
                  dangerouslySetInnerHTML={{ __html: faq.answer }}
                />
              </div>
            ))}
          </div>
        )}

        {faqs.length > ITEMS_PER_PAGE && (
          <div className="mt-12 flex items-center justify-between">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all
                ${currentPage === 1 
                  ? 'bg-slate-100 text-slate-400' 
                  : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
            >
              Previous
            </button>
            <span className="text-sm text-slate-500">
              {currentPage} of {Math.ceil(faqs.length / ITEMS_PER_PAGE)}
            </span>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === Math.ceil(faqs.length / ITEMS_PER_PAGE)}
              className={`px-5 py-2 rounded-md text-sm font-medium transition-all
                ${currentPage === Math.ceil(faqs.length / ITEMS_PER_PAGE) 
                  ? 'bg-slate-100 text-slate-400' 
                  : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <style>{`
        .ck-content {
          color: #475569;
          line-height: 1.7;
          font-size: 0.95rem;
        }

        .ck-content h2 {
          color: #1e293b;
          font-size: 1.3rem;
          margin: 1.8rem 0 1rem;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .ck-content h3 {
          color: #334155;
          font-size: 1.1rem;
          margin: 1.5rem 0 0.8rem;
          font-weight: 600;
        }

        .ck-content p {
          margin: 0.8rem 0;
        }

        .ck-content ul {
          list-style-type: disc;
          margin: 1rem 0 1rem 1.2rem;
        }

        .ck-content ol {
          list-style-type: decimal;
          margin: 1rem 0 1rem 1.2rem;
        }

        .ck-content li {
          margin: 0.5rem 0;
          padding-left: 0.3rem;
        }

        .ck-content a {
          color: #2563eb;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.15s;
        }

        .ck-content a:hover {
          color: #1d4ed8;
        }

        .ck-content blockquote {
          border-left: 3px solid #e2e8f0;
          padding-left: 1rem;
          margin: 1.5rem 0;
          color: #64748b;
          font-style: italic;
        }

        .ck-content figure {
          margin: 1.5rem 0;
        }

        .ck-content figure img {
          max-width: 100%;
          border-radius: 8px;
        }

        .ck-content figcaption {
          text-align: center;
          color: #64748b;
          font-size: 0.875rem;
          margin-top: 0.5rem;
        }

        .ck-content table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          margin: 1.5rem 0;
        }

        .ck-content table th,
        .ck-content table td {
          border: 1px solid #e2e8f0;
          padding: 0.7rem 1rem;
        }

        .ck-content table th {
          background-color: #f8fafc;
          font-weight: 600;
          color: #334155;
        }

        .ck-content code {
          background: #f1f5f9;
          padding: 0.2em 0.4em;
          border-radius: 4px;
          font-size: 0.9em;
          color: #475569;
          font-family: ui-monospace, monospace;
        }

        .ck-content .todo-list {
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }

        .ck-content .todo-list li {
          margin: 0.5rem 0;
          display: flex;
          align-items: flex-start;
          gap: 0.5rem;
        }
      `}</style>
    </div>
  );
};

export default GetFAQ;
