import { useState } from "react";
import CodeSandbox from "./CodeSandbox";

export default function App() {
  const [language, setLanguage] = useState("HTML");
  const [task, setTask] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setGeneratedCode(""); // Előző kimenet törlése
    setLoading(true);

    const res = await fetch("http://localhost:8000/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language, task }),
    });

    if (!res.body) {
      setGeneratedCode("Hiba történt a kapcsolat során.");
      setLoading(false);
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder("utf-8");

    let fullText = "";
    reader.read().then(function processText({ done, value }) {
      if (done) {
        setLoading(false);
        return;
      }

      const newText = decoder.decode(value, { stream: true });
      fullText += newText;
      setGeneratedCode((prev) => prev + newText);

      reader.read().then(processText); // Folytatja az olvasást
    });
  };

  function extractBetweenDelimiters(str: string, startChar: string, endChar: string): string {
    const match = str.match(new RegExp(`\\${startChar}(.*?)\\${endChar}`));
    return match ? match[1] : "";
}

  return (
    <div className="flex items-center justify-center h-screen space">
      <div className="flex space-x-4 bg-gray-200 p-6 rounded-lg shadow-md">
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
          <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg">
            <h1 className="text-3xl font-bold text-gray-800 text-center">
              Kód Generáló App 🚀
            </h1>

            {/* Feladat input mező */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Írd le a feladatot:
              </label>
              <input
                type="text"
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Pl.: Hozz létre egy React komponenst..."
                onChange={(e) => setTask(e.target.value)}
              />
            </div>

            {/* Nyelvválasztó legördülő menü */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Válassz nyelvet:
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="TypeScript">TypeScript</option>
              </select>
            </div>

            {/* Generálás gomb */}
            <button
              className="w-full bg-blue-600 text-white text-lg font-semibold py-3 rounded-lg mt-6 hover:bg-blue-700 transition"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Generálás folyamatban..." : "Kód generálása ✨"}
            </button>

            {/* Generált kód megjelenítése */}
            {generatedCode && (
                <div className="mt-6 p-4 bg-gray-900 text-white rounded-lg overflow-x-auto">
                  <h2 className="text-lg font-semibold mb-2 text-blue-300">
                    Generált Kód:
                  </h2>
                  <pre className="text-sm font-mono whitespace-pre-wrap">
                    {generatedCode}
                  </pre>
                </div>
            )}
          </div>
        </div>
        <CodeSandbox code={generatedCode} />
      </div>
    </div>
  );
}
