import { useState } from "react";
import html2pdf from "html2pdf.js";

export default function CollectbarTool() {
  const questions = [
    {
      title: "Kanzleiname",
      type: "input",
      placeholder: "Name der Kanzlei eingeben...",
    },
    {
      title: "Kurzvorstellung meiner Person",
      type: "textarea",
      placeholder:
        "Wer ich bin, meine Rolle im Projekt und meine Aufgabe bei der Einführung/Begleitung der Lösung.",
    },
    {
      title: "Agenda",
      type: "textarea",
      placeholder:
        "Begrüßung - Kurze Einordnung des Anliegens - Abfrage der Anforderungen und Kanzleibedürfnisse - Einholung von Informationen zu Funktionen und Möglichkeiten - Klärung der benötigten Informationen und Voraussetzungen für die Umsetzung - Nächste Schritte.",
    },
    {
      title: "Wie arbeiten Sie aktuell mit eingehenden Dokumenten?",
      type: "textarea",
      placeholder: "Papier, Scan, E-Mail, Upload, DATEV Upload Mobil etc.",
    },
    {
      title: "Welche Systeme werden bereits genutzt?",
      type: "textarea",
      placeholder:
        "DATEV DMS, Unternehmen Online, Meine Steuern, Personalakte etc.",
    },
    {
      title: "Gibt es aktuell Probleme oder Engpässe?",
      type: "textarea",
      placeholder:
        "Medienbrüche, Suchzeiten, fehlende Transparenz, Freigaben, Unterschriftenprozesse.",
    },
    {
      title: "Welche Erwartungen haben Sie an Collect|bar?",
      type: "textarea",
      placeholder:
        "Zeitersparnis, Strukturierung, Automatisierung, weniger manuelle Arbeit.",
    },
    {
      title: "Welche Mitarbeitergruppen arbeiten später mit der Lösung?",
      type: "textarea",
      placeholder: "Sekretariat, Steuerberater, Sachbearbeiter, Lohn etc.",
    },
    {
      title: "Werden Belege bereits über Unternehmen Online verarbeitet?",
      type: "textarea",
      placeholder: "Aktuelle Prozesse und Nutzung beschreiben...",
    },
    {
      title: "Wird 'Meine Steuern' aktiv genutzt?",
      type: "textarea",
      placeholder: "Aktuelle Nutzung und Prozesse beschreiben...",
    },
    {
      title: "Wird DATEV Personalakte eingesetzt?",
      type: "textarea",
      placeholder: "Aktuelle Nutzung und Anforderungen beschreiben...",
    },
    {
      title: "Wird DATEV DMS genutzt?",
      type: "textarea",
      placeholder: "Bestehende DMS-Prozesse beschreiben...",
    },
    {
      title: "Welche Dokumente werden unterschrieben?",
      type: "textarea",
      placeholder: "Lokal oder digital? Welche Abläufe gibt es?",
    },
    {
      title: "Werden externe Signaturen benötigt?",
      type: "textarea",
      placeholder: "Wer versendet die Signaturanfragen?",
    },
    {
      title: "Ist ein Jahresabschluss-Workflow gewünscht?",
      type: "textarea",
      placeholder: "Erstellung → Prüfung → Freigabe → Signatur → Ablage",
    },
    {
      title: "Sind mehrere Unterschriften notwendig?",
      type: "textarea",
      placeholder: "Einzel- oder Mehrfachsignatur definieren.",
    },
    {
      title: "Gibt es Freigabestufen?",
      type: "textarea",
      placeholder: "Sachbearbeiter → Steuerberater → Mandant",
    },
    {
      title: "Wird auftragsbezogen in DATEV DMS abgelegt?",
      type: "textarea",
      placeholder: "Bestehende Ablagestruktur beschreiben...",
    },
    {
      title: "Ist EO comfort notwendig?",
      type: "textarea",
      placeholder:
        "Anforderungen an auftragsbezogene Steuerung beschreiben...",
    },
    {
      title: "Ist EO comfort Connect notwendig?",
      type: "textarea",
      placeholder: "Technische Integration prüfen und dokumentieren...",
    },
    {
      title: "Benutzerliste bereitstellen",
      type: "textarea",
      placeholder:
        "Benutzername, Passwort, Zusatz, Gruppen und Rollen definieren.",
    },
    {
      title: "Signatur-Postfach anlegen",
      type: "textarea",
      placeholder: "Empfehlung: signatur@kanzlei.de",
    },
    {
      title: "Demo-Account erstellen",
      type: "textarea",
      placeholder: "30 Tage Testphase und danach Paketwahl.",
    },
    {
      title: "Offene Fragen sammeln",
      type: "textarea",
      placeholder: "Fehlende Informationen und Zuständigkeiten festhalten.",
    },
    {
      title: "Technischen Termin planen",
      type: "textarea",
      placeholder: "Aufschaltung, Einrichtung und Schulung abstimmen.",
    },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isExporting, setIsExporting] = useState(false);

  const handleAnswerChange = (value) => {
    setAnswers({
      ...answers,
      [currentStep]: value,
    });
  };

  const exportPDF = async () => {
    setIsExporting(true);

    // Give React time to render the export element visibly
    await new Promise((resolve) => setTimeout(resolve, 100));

    const element = document.getElementById("pdf-export");

    const fileName =
      answers[0] && answers[0].trim() !== ""
        ? answers[0].trim()
        : "Erstgespräch";

    try {
      await html2pdf().set({
        margin: [10, 10, 10, 10], // top, right, bottom, left in mm
        filename: `${fileName}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          logging: false,
          letterRendering: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
        },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      }).from(element).save();
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#edf2f7",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "950px",
          margin: "0 auto",
          background: "#ffffff",
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            background: "linear-gradient(135deg, #031b34 0%, #0a2f4f 100%)",
            padding: "40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h1
              style={{
                color: "white",
                fontSize: "42px",
                marginBottom: "10px",
                fontWeight: "700",
              }}
            >
              Collect
              <span style={{ color: "#16c79a" }}>|</span>
              bar Erstgespräch
            </h1>

            <p style={{ color: "#d1d5db", fontSize: "18px" }}>
              Interaktiver Gesprächsleitfaden
            </p>
          </div>

          <button
            onClick={exportPDF}
            disabled={isExporting}
            style={{
              background: isExporting ? "#94a3b8" : "#16c79a",
              color: "white",
              border: "none",
              padding: "16px 28px",
              borderRadius: "14px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: isExporting ? "not-allowed" : "pointer",
            }}
          >
            {isExporting ? "Wird erstellt..." : "PDF speichern"}
          </button>
        </div>

        {/* CONTENT */}
        <div style={{ padding: "40px" }}>
          {/* PROGRESS */}
          <div style={{ marginBottom: "35px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <span style={{ fontWeight: "600", color: "#0f172a" }}>
                Schritt {currentStep + 1} von {questions.length}
              </span>

              <span style={{ color: "#64748b" }}>
                {questions[currentStep].title}
              </span>
            </div>

            <div
              style={{
                width: "100%",
                height: "10px",
                background: "#e2e8f0",
                borderRadius: "999px",
              }}
            >
              <div
                style={{
                  width: `${((currentStep + 1) / questions.length) * 100}%`,
                  height: "100%",
                  background: "#16c79a",
                  borderRadius: "999px",
                  transition: "0.3s ease",
                }}
              />
            </div>
          </div>

          {/* QUESTION */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #dbe4ee",
              borderRadius: "22px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "28px 32px",
                borderBottom: "1px solid #e5e7eb",
                background: "#f8fafc",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: "32px",
                  color: "#0f172a",
                  fontWeight: "700",
                }}
              >
                {questions[currentStep].title}
              </h2>
            </div>

            <div style={{ padding: "35px" }}>
              {questions[currentStep].type === "input" ? (
                <input
                  type="text"
                  value={answers[currentStep] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder={questions[currentStep].placeholder}
                  style={{
                    width: "100%",
                    padding: "20px",
                    borderRadius: "16px",
                    border: "1px solid #cbd5e1",
                    fontSize: "18px",
                    background: "#f8fafc",
                    color: "#111827",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              ) : (
                <textarea
                  value={answers[currentStep] || ""}
                  onChange={(e) => handleAnswerChange(e.target.value)}
                  placeholder={questions[currentStep].placeholder}
                  style={{
                    width: "100%",
                    minHeight: "260px",
                    borderRadius: "16px",
                    border: "1px solid #cbd5e1",
                    padding: "20px",
                    fontSize: "16px",
                    resize: "vertical",
                    background: "#f8fafc",
                    color: "#111827",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                />
              )}
            </div>
          </div>

          {/* NAVIGATION */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "35px",
            }}
          >
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              disabled={currentStep === 0}
              style={{
                padding: "16px 26px",
                borderRadius: "14px",
                border: "none",
                background: currentStep === 0 ? "#cbd5e1" : "#031b34",
                color: "white",
                cursor: currentStep === 0 ? "not-allowed" : "pointer",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Zurück
            </button>

            {currentStep === questions.length - 1 ? (
              <button
                onClick={exportPDF}
                disabled={isExporting}
                style={{
                  padding: "16px 26px",
                  borderRadius: "14px",
                  border: "none",
                  background: isExporting ? "#94a3b8" : "#16c79a",
                  color: "white",
                  cursor: isExporting ? "not-allowed" : "pointer",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                {isExporting ? "Wird erstellt..." : "PDF erstellen"}
              </button>
            ) : (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!answers[currentStep]?.trim()}
                style={{
                  padding: "16px 26px",
                  borderRadius: "14px",
                  border: "none",
                  background: !answers[currentStep]?.trim()
                    ? "#94a3b8"
                    : "#16c79a",
                  color: "white",
                  cursor: !answers[currentStep]?.trim()
                    ? "not-allowed"
                    : "pointer",
                  fontSize: "16px",
                  fontWeight: "700",
                }}
              >
                Weiter
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ─── PDF EXPORT ELEMENT ───────────────────────────────────────────────
          Rendered off-screen (left: -9999px) so html2canvas can paint it.
          position:absolute keeps it out of the normal flow.
          visibility is toggled via isExporting so it's actually in the DOM
          with real dimensions when html2canvas reads it.
      ──────────────────────────────────────────────────────────────────────── */}
      <div
        id="pdf-export"
        style={{
          position: "absolute",
          left: isExporting ? "0" : "-9999px",
          top: "0",
          width: "794px", // ~A4 at 96 dpi
          background: "white",
          padding: "40px",
          fontFamily: "Arial, sans-serif",
          zIndex: isExporting ? "9999" : "-1",
          visibility: isExporting ? "visible" : "hidden",
        }}
      >
        {/* PDF Header */}
        <div
          style={{
            borderBottom: "3px solid #031b34",
            paddingBottom: "20px",
            marginBottom: "30px",
          }}
        >
          <h1
            style={{
              fontSize: "32px",
              color: "#031b34",
              margin: "0 0 6px 0",
              fontWeight: "700",
            }}
          >
            Collect|bar Erstgespräch
          </h1>
          {answers[0] && (
            <p style={{ margin: 0, fontSize: "18px", color: "#64748b" }}>
              {answers[0]}
            </p>
          )}
        </div>

        {/* All questions + answers */}
        {questions.map((q, index) => (
          <div
            key={index}
            style={{
              marginBottom: "28px",
              breakInside: "avoid",
              pageBreakInside: "avoid",
            }}
          >
            <h2
              style={{
                fontSize: "15px",
                fontWeight: "700",
                color: "#031b34",
                margin: "0 0 8px 0",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              {index + 1}. {q.title}
            </h2>

            <div
              style={{
                border: "1px solid #dbe4ee",
                borderLeft: "4px solid #16c79a",
                borderRadius: "6px",
                padding: "12px 16px",
                background: "#f8fafc",
                whiteSpace: "pre-wrap",
                color: "#111827",
                fontSize: "14px",
                lineHeight: "1.6",
                minHeight: "40px",
              }}
            >
              {answers[index] || "—"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
