"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CheckCircle, XCircle } from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface ExamSystemProps {
  courseId: number;
  examId: number;
}

export default function ExamSystem({ courseId, examId }: ExamSystemProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Este es un ejemplo de preguntas. En una implementación real, estas vendrían de una API o base de datos.
  const questions: Question[] = [
    {
      id: 1,
      text: "¿Cuál es la sintaxis correcta para declarar una variable en JavaScript?",
      options: ["var x = 5;", "variable x = 5;", "x := 5;", "int x = 5;"],
      correctAnswer: 0,
    },
    {
      id: 2,
      text: "¿Qué significa DOM en desarrollo web?",
      options: [
        "Document Object Model",
        "Data Object Model",
        "Digital Ordinance Model",
        "Document Orientation Model",
      ],
      correctAnswer: 0,
    },
    {
      id: 3,
      text: "¿Cuál de los siguientes no es un tipo de dato en JavaScript?",
      options: ["Number", "String", "Boolean", "Float"],
      correctAnswer: 3,
    },
  ];

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResults(true);
    }
  };

  const renderQuestion = (question: Question) => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{question.text}</h3>
      <RadioGroup
        onValueChange={(value) => handleAnswer(Number.parseInt(value))}
      >
        {question.options.map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem value={index.toString()} id={`option-${index}`} />
            <Label htmlFor={`option-${index}`}>{option}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );

  const renderResults = () => (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold">Resultados del examen</h3>
      <p className="text-xl">
        Tu puntuación: {score} de {questions.length}
      </p>
      {questions.map((question, index) => (
        <div key={question.id} className="border p-4 rounded-lg">
          <p className="font-semibold">{question.text}</p>
          <p className="mt-2">
            Respuesta correcta: {question.options[question.correctAnswer]}
          </p>
          {index < score ? (
            <CheckCircle className="text-green-500 mt-2" />
          ) : (
            <XCircle className="text-red-500 mt-2" />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      {!showResults ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Examen del Curso</h2>
          {renderQuestion(questions[currentQuestion])}
          <Button
            onClick={handleNextQuestion}
            disabled={selectedAnswer === null}
            className="mt-4"
          >
            {currentQuestion < questions.length - 1 ? "Siguiente" : "Finalizar"}
          </Button>
        </>
      ) : (
        renderResults()
      )}
    </div>
  );
}
