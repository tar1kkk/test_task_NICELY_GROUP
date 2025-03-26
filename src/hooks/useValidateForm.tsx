import { useMemo } from "react";

const useValidateForm = (formData: { name: string; email: string }, phone: string) => {
    const validation = useMemo(() => {
        const errors: Record<string, string> = {};

        if (!formData.name.trim()) {
            errors.name = "Введіть ім’я";
        }

        if (formData.email && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)) {
            errors.email = "Некоректна пошта";
        }

        if (!phone.trim()) {
            errors.phone = "Введіть телефон";
        } else if (!/^\+?\d{10,14}$/.test(phone)) {
            errors.phone = "Некоректний номер";
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors,
        };
    }, [formData, phone]);

    return { validation };
};

export default useValidateForm;
