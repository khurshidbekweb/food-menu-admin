import { useState } from "react";
import { Lock, User } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authUtils } from "@/utils/auth.utils";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const Auth = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const {t} = useTranslation()
    const auth = useMutation({
        mutationFn: authUtils.auth,
        onSuccess: () => {
            toast.success('Muvaffaqiyatli ro`yxatdan o`tildi')
            setTimeout(() => {
                navigate('/dashboard')
                window.location.reload()
            }, 1500)
        },
        onError: (err) => {
            console.log(err);
            toast.error('Xatolik mavjud')                
        }
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        auth.mutate({
            password: password,
            username: name
        })
    };
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg relative overflow-hidden">
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-yellow-200 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-yellow-200 rounded-full translate-y-1/2 -translate-x-1/2 opacity-50" />

                <div className="text-center">
                    <h2 className="text-4xl font-bold text-green-600 mb-2">{t("auth")}!</h2>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                placeholder="Username"
                            />
                        </div>

                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                                placeholder="*******"
                            />
                        </div>
                    </div>
                    <div>
                        <Button
                            type="submit"
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                           {t("auth_button")}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Auth;