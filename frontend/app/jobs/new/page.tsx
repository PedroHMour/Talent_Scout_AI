'use client'; // Converte o componente para um Client Component para usar hooks

import { useState, ChangeEvent, FormEvent, DragEvent } from 'react'; // Importa hooks e tipos do React
import Header from "../../../components/Header"; // Importa o componente de cabeçalho
import { Upload, FileText, BrainCircuit, X, Paperclip } from 'lucide-react';

// Interface para os dados do formulário
interface FormData {
  jobTitle: string;
  jobDescription: string;
}

export default function CreateNewJobPage() {
  // Estado para os campos de texto do formulário
  const [formData, setFormData] = useState<FormData>({
    jobTitle: '',
    jobDescription: '',
  });

  // Estado para armazenar a lista de arquivos de currículo
  const [files, setFiles] = useState<File[]>([]);
  
  // Estado para feedback visual de arrastar e soltar
  const [isDragging, setIsDragging] = useState(false);

  // Manipulador para atualizar o estado dos campos de texto
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Manipulador para quando arquivos são adicionados (via clique ou arrastar)
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Converte FileList para Array e adiciona ao estado, evitando duplicatas
      const newFiles = Array.from(e.target.files);
      setFiles((prevFiles) => {
        const existingFiles = new Set(prevFiles.map(f => f.name));
        const uniqueNewFiles = newFiles.filter(f => !existingFiles.has(f.name));
        return [...prevFiles, ...uniqueNewFiles];
      });
    }
  };

  // Manipulador para remover um arquivo da lista
  const handleRemoveFile = (indexToRemove: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  // Manipulador para o envio do formulário
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Impede o recarregamento da página

    if (files.length === 0) {
      alert("Please upload at least one resume.");
      return;
    }

    // Exibe os dados capturados no console do navegador
    console.log("--- Form Data Submitted ---");
    console.log("Job Title:", formData.jobTitle);
    console.log("Job Description:", formData.jobDescription);
    console.log("Files to be uploaded:", files);
    console.log("--------------------------");

    alert("Check the browser console (F12) to see the captured data!");
  };
  
  // Funções para o efeito de arrastar e soltar
  const handleDragEvents = (e: DragEvent<HTMLDivElement>, isEntering: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(isEntering);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    handleDragEvents(e, false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
       setFiles((prevFiles) => {
        const existingFiles = new Set(prevFiles.map(f => f.name));
        const uniqueNewFiles = newFiles.filter(f => !existingFiles.has(f.name));
        return [...prevFiles, ...uniqueNewFiles];
      });
      e.dataTransfer.clearData();
    }
  };


  return (
    <>
      <Header pageTitle="Create a New Job" />
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Seção 1: Detalhes da Vaga */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                  <FileText className="text-blue-600 dark:text-blue-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Job Details</h2>
              </div>
              <div className="mt-6 grid grid-cols-1 gap-6">
                <div>
                  <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Title</label>
                  <input
                    type="text"
                    id="jobTitle"
                    placeholder="e.g., Senior Frontend Developer"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-slate-700/50 border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Job Description</label>
                  <textarea
                    id="jobDescription"
                    rows={6}
                    placeholder="Describe the role, responsibilities, and requirements..."
                    value={formData.jobDescription}
                    onChange={handleInputChange}
                    className="mt-1 block w-full px-4 py-2 bg-gray-50 dark:bg-slate-700/50 border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    required
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Seção 2: Upload de Currículos */}
            <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                  <Upload className="text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upload Resumes</h2>
              </div>
              <div className="mt-6">
                <div 
                  onDragEnter={(e) => handleDragEvents(e, true)}
                  onDragOver={(e) => handleDragEvents(e, true)}
                  onDragLeave={(e) => handleDragEvents(e, false)}
                  onDrop={handleDrop}
                  className={`flex justify-center items-center w-full px-6 pt-5 pb-6 border-2 border-dashed rounded-md transition-colors duration-200 ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50' : 'border-gray-300 dark:border-slate-600'}`}
                >
                  <div className="space-y-1 text-center">
                    <Upload size={48} className="mx-auto text-gray-400 dark:text-gray-500" />
                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                      <label htmlFor="file-upload" className="relative cursor-pointer bg-transparent rounded-md font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 focus-within:outline-none">
                        <span>Upload files</span>
                        <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple onChange={handleFileChange} />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">PDF, DOC, DOCX up to 10MB</p>
                  </div>
                </div>
              </div>

              {/* Seção de Feedback Visual para Arquivos Adicionados */}
              {files.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-md font-medium text-gray-800 dark:text-gray-200">Attached Files:</h3>
                  <ul className="mt-2 space-y-2">
                    {files.map((file, index) => (
                      <li key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600">
                        <div className="flex items-center gap-3 overflow-hidden">
                          <Paperclip className="w-5 h-5 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate" title={file.name}>{file.name}</span>
                        </div>
                        <div className='flex items-center gap-3 flex-shrink-0'>
                           <span className="text-xs text-gray-500 dark:text-gray-400">{(file.size / 1024).toFixed(2)} KB</span>
                           <button type="button" onClick={() => handleRemoveFile(index)} className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-full">
                             <X className="w-4 h-4" />
                           </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            
            {/* Botões de Ação */}
            <div className="flex justify-end gap-4 pt-4">
               <button type="button" className="px-6 py-2.5 bg-gray-200 dark:bg-slate-700 text-gray-800 dark:text-gray-200 font-semibold rounded-lg hover:bg-gray-300 dark:hover:bg-slate-600 transition-all">
                Cancel
              </button>
              <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-blue-500/30 active:scale-95 transition-all duration-300">
                <BrainCircuit size={20} />
                <span>Process and Rank Candidates</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}