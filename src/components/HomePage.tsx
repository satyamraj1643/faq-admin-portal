import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const FAQHomepage = () => {
  const navigate = useNavigate();
  const handleMouseOver = (event) => {
    event.currentTarget.style.backgroundColor = "#F3F4F6";
  };

  const handleMouseOut = (event) => {
    event.currentTarget.style.backgroundColor = "white";
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
     
      
      <div style={{ width: "100%", backgroundColor: "#1E40AF", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "white", padding: "32px" }}> {/* Fixed width to 50% */}
        <motion.h1
          style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "24px" }}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          FAQ Management System
        </motion.h1>

        <motion.div
          style={{ display: "flex", gap: "16px", marginTop: "16px" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <button 
            style={{ backgroundColor: "white", color: "#1E40AF", padding: "16px 32px", fontSize: "1.1rem", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", cursor: "pointer", border: "none", transition: "transform 0.2s" }}
            onClick={() => navigate("/get-faq")}
            onMouseOver={(e) => { handleMouseOver(e); e.currentTarget.style.transform = "scale(1.05)"; }}
            onMouseOut={(e) => { handleMouseOut(e); e.currentTarget.style.transform = "scale(1)"; }}
          >
            Get All FAQs
          </button>
          <button 
            style={{ backgroundColor: "white", color: "#1E40AF", padding: "16px 32px", fontSize: "1.1rem", borderRadius: "12px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", cursor: "pointer", border: "none", transition: "transform 0.2s" }}
            onClick={() => navigate("/create-faq")}
            onMouseOver={(e) => { handleMouseOver(e); e.currentTarget.style.transform = "scale(1.05)"; }}
            onMouseOut={(e) => { handleMouseOut(e); e.currentTarget.style.transform = "scale(1)"; }}
          >
            Create FAQs
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQHomepage;