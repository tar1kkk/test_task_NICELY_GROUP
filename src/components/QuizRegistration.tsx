import { useState } from "react";
import "react-intl-tel-input/dist/main.css";
import UserForm from "./UserForm.tsx";
import imgRigth from "../image/right-bg.jpg";

const questions = [
    { question: "Ваше улюблене хобі?", options: ["Читання", "Спорт", "Подорожі"] },
    { question: "Яка у вас освіта?", options: ["Середня", "Вища", "Самоосвіта"] },
    { question: "Який ваш улюблений колір?", options: ["Синій", "Червоний", "Зелений"] },
    { question: "Що ви любите їсти?", options: ["М'ясо", "Овочі", "Фрукти"] },
    { question: "Який ваш стиль одягу?", options: ["Класичний", "Кежуал", "Спортивний"] },
];

type formData = {
    name : string,
    email : string,
    phone : string,
};

export default function QuizRegistration() {
    const [step, setStep] = useState<number>(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [formData, setFormData] = useState<formData>({ name: "", email: "", phone: "" });
    const [phone, setPhone] = useState("");

    const handleAnswer = (answer: string) => {
        setAnswers([...answers, answer]);
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setStep(questions.length);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="w-full h-screen flex items-center bg-gray-100 p-6">
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
                <div className="w-full md:w-1/2 p-6 text-left">
                    {step < questions.length ? (
                        <div>
                            <h2 className="text-xl font-bold mb-4 text-center">{questions[step].question}</h2>
                            <div className="space-y-3">
                                {questions[step].options.map((option) => (
                                    <button key={option} className="w-full py-3 px-4 text-lg bg-gray-200 hover:bg-gray-300 rounded-lg" onClick={() => handleAnswer(option)}>
                                        {option}
                                    </button>
                                ))}
                            </div>
                            <div className="mt-4 text-gray-600 flex justify-center">{step + 1}/5</div>
                        </div>
                    ) : (
                        <UserForm setFormData={setFormData} formData={formData} answers={answers} handleChange={handleChange} phone={phone} setPhone={setPhone} />
                    )}
                </div>
                <div className="w-full sm:block md:w-2/3 hidden md:block sm:order-last sm:mt-4 md:mt-0">
                    <img src={imgRigth} alt="Background" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
    );
}