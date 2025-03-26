import IntlTelInput from "react-intl-tel-input";
import { Button } from "@/components/ui/button.tsx";
import useValidateForm from "@/hooks/useValidateForm.tsx";
import { useState } from "react";

const UserForm = ({ formData, phone, answers, handleChange, setPhone, setFormData }) => {
    const [isFormSubmit, setIsFormSubmit] = useState(false);
    const { validation } = useValidateForm(formData, phone);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const data = { ...formData, phone, answers };

        await fetch("/api/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        setFormData({ name: "", email: "" });
        setPhone("");
        setIsFormSubmit(true);
    };

    if (isFormSubmit) {
        return <div className="text-center text-xl font-semibold">Форма відправлена</div>;
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold text-center">Надiслати результати</h2>

            <div>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Ім’я"
                    className="border p-2 w-full"
                    onChange={handleChange}
                    required
                />
                {validation.errors.name && <p className="text-red-500">{validation.errors.name}</p>}
            </div>

            <div>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Пошта"
                    className="border p-2 w-full"
                    onChange={handleChange}
                    required
                />
                {validation.errors.email && <p className="text-red-500">{validation.errors.email}</p>}
            </div>

            <div className="w-full">
                <IntlTelInput
                    inputClassName="border p-2 w-full m-0"
                    preferredCountries={["ua"]}
                    value={phone}
                    onPhoneNumberChange={(status, value) => setPhone(value)}
                />
                {validation.errors.phone && <p className="text-red-500">{validation.errors.phone}</p>}
            </div>

            <Button
                disabled={!validation.isValid}
                type="submit"
                className="border p-2 w-full bg-blue-500 text-white hover:bg-blue-600"
            >
                Відправити
            </Button>
        </form>
    );
};

export default UserForm;
