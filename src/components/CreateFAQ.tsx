import React, { useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

const BACKEND_BASE_URL=`https://faq-backend-212c.onrender.com`

const FAQForm = () => {
  const [formData, setFormData] = useState({
    question: '',
    answer: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState({ show: false, type: '', message: '' });

  const handleSubmit = async (e) => {

    e.preventDefault();
    setIsSubmitting(true);

    console.log(formData);

    try {
      const response = await fetch(`${BACKEND_BASE_URL}/faqs/createFaqs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setNotification({ show: true, type: 'success', message: 'FAQ added successfully!' });
        setFormData({ question: '', answer: '' });
      } else {
        setNotification({ show: true, type: 'error', message: data.message || 'Failed to add FAQ' });
      }
    } catch (error) {
      setNotification({ show: true, type: 'error', message: 'Network error occurred' });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setNotification({ show: false, type: '', message: '' }), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 flex items-center justify-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Create FAQ Entry
          </h2>

          {notification.show && (
            <div className={`mb-6 p-4 rounded-lg ${
              notification.type === 'error' 
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {notification.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label 
                htmlFor="question" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Question
              </label>
              <input
                id="question"
                type="text"
                value={formData.question}
                onChange={(e) => setFormData(prev => ({ ...prev, question: e.target.value }))}
                placeholder="Enter your question here"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Answer
              </label>
              <div className="rounded-sm overflow-hidden">
                <CKEditor
                  editor={ClassicEditor}
                  data={formData.answer}
                  config={{
                    licenseKey: "eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3Mzk2NjM5OTksImp0aSI6IjA0MjFlMDJiLTEyNGUtNGIyYy04MWM3LTc4NTFlOWU0Njc3YSIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImFmMzZiYjYyIn0.sgxUNsrOZkaAKPAv6ftuXFZcapJk4IO2UUe6Rwx2H_thpU1TV323wQs_BQDz8L-A0CPLvZWLRD_dgpYLoI__iA",
                    toolbar: {
                      items: [
                        'undo', 'redo',
                        '|',
                        'heading',
                        '|',
                        'fontSize', 'fontFamily', 'fontColor', 'fontBackgroundColor',
                        '|',
                        'bold', 'italic', 'underline', 'strikethrough', 'subscript', 'superscript',
                        '|',
                        'bulletedList', 'numberedList', 'todoList',
                        '|',
                        'alignment',
                        '|',
                        'link', 'insertTable', 'mediaEmbed',
                        '|',
                        'indent', 'outdent',
                        '|',
                        'blockQuote', 'code', 'codeBlock',
                        '|',
                        'horizontalLine', 'pageBreak',
                        '|',
                        'findAndReplace', 'selectAll',
                        '|',
                        'removeFormat'
                      ],
                      shouldNotGroupWhenFull: true
                    },
                    // image: {
                    //   toolbar: [
                    //     'imageStyle:inline',
                    //     'imageStyle:block',
                    //     'imageStyle:side',
                    //     '|',
                    //     'toggleImageCaption',
                    //     'imageTextAlternative',
                    //     '|',
                    //     'resizeImage'
                    //   ]
                    // },
                    table: {
                      contentToolbar: [
                        'tableColumn',
                        'tableRow',
                        'mergeTableCells',
                        'tableCellProperties',
                        'tableProperties'
                      ]
                    },
                    heading: {
                      options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' }
                      ]
                    },
                  }}
                  onChange={(event, editor) => {
                    setFormData(prev => ({ ...prev, answer: editor.getData() }));
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full   py-3 px-6 rounded-lg text-white font-medium 
                ${isSubmitting ? 'bg-slate-800 cursor-not-allowed' : 'bg-slate-600 hover:bg-slate-800 '} 
                transition-colors duration-200 flex items-center justify-center`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  saving...
                </>
              ) : (
                'Save FAQ'
              )}
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .ck-editor__editable {
          min-height: 300px !important;
          max-height: 500px;
          overflow-y: auto !important;
          padding: 2rem !important;
        }
        
        .ck-editor__editable_inline {
          padding: 1.5rem !important;
          font-size: 1rem !important;
        }

        .ck.ck-editor__main>.ck-editor__editable {
          background-color: white !important;
        }

        .ck.ck-toolbar {
          border-radius: 0.5rem 0.5rem 0 0 !important;
          border-color: #e5e7eb !important;
          background: #f9fafb !important;
          padding: 0.5rem !important;
        }

        .ck.ck-editor__main>.ck-editor__editable {
          border-radius: 0 0 0.5rem 0.5rem !important;
          border-color: #e5e7eb !important;
        }

        /* Remove focus border highlight */
        .ck.ck-editor__editable:not(.ck-editor__nested-editable).ck-focused {
          border: 1px solid #e5e7eb !important;
          box-shadow: none !important;
        }

        .ck.ck-button {
          color: #374151 !important;
          padding: 0.5rem !important;
        }

        .ck.ck-button:hover {
          background: #f3f4f6 !important;
        }

        .ck.ck-toolbar__separator {
          background: #e5e7eb !important;
        }

        /* Add padding to toolbar items */
        .ck.ck-toolbar > .ck-toolbar__items {
          padding: 0.25rem !important;
        }

        /* Adjust spacing between toolbar items */
        .ck.ck-toolbar > .ck-toolbar__items > * {
          margin-right: 0.25rem !important;
        }
      `}</style>
    </div>
  );
};

export default FAQForm;