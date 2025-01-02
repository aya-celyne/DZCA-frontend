import React, { useState, useEffect } from "react";

const DynamicAlert = React.forwardRef(({ message }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dynamicMessage, setDynamicMessage] = useState(message);

  useEffect(() => {
    if (ref) {
      ref.current = {
        showAlert: (msg) => {
          setDynamicMessage(msg || message); // Utilise le message par défaut si aucun n'est passé
          setIsVisible(true);
        },
        closeAlert: () => setIsVisible(false),
      };
    }
  }, [ref, message]);

  return (
    <>
      {isVisible && (
        <div style={styles.overlay}>
          <div style={styles.alertBox}>
            <p>{dynamicMessage}</p>
            <button onClick={() => setIsVisible(false)} style={styles.closeButton}>
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
});

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  alertBox: {
    backgroundColor: "#fff",
    borderRadius: "8px",
    padding: "20px",
    width: "300px",
    textAlign: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
  closeButton: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default DynamicAlert;
