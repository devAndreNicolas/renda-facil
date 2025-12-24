'use client';

import { NextSeo } from 'next-seo';
import { useForm, ValidationError } from '@formspree/react';

export default function Contato() {
    const [state, handleSubmit] = useForm("xzdplbyd");

    return (
        <>
            <NextSeo
                title="Contato - RendeCerto"
                description="Entre em contato com o RendeCerto. Tire suas dúvidas, envie sugestões ou reporte problemas."
                canonical="https://rendecerto.com.br/contato"
            />

            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
                    📧 Entre em Contato
                </h1>

                <div className="card mb-8">
                    <p className="text-gray-700 dark:text-gray-300 mb-6 text-center">
                        Tem dúvidas, sugestões ou encontrou algum problema? Estamos aqui para ajudar!
                    </p>

                    {state.succeeded ? (
                        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                            <div className="text-4xl mb-4">✅</div>
                            <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">
                                Mensagem Enviada!
                            </h3>
                            <p className="text-green-700 dark:text-green-300 mb-4">
                                Recebemos sua mensagem e responderemos em até 48 horas úteis.
                            </p>
                            <button
                                onClick={() => window.location.reload()}
                                className="btn-secondary"
                            >
                                Enviar Outra Mensagem
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Nome *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="input-field"
                                    placeholder="Seu nome completo"
                                />
                                <ValidationError
                                    prefix="Nome"
                                    field="name"
                                    errors={state.errors}
                                    className="text-red-600 text-sm mt-1"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Email *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="input-field"
                                    placeholder="seu@email.com"
                                />
                                <ValidationError
                                    prefix="Email"
                                    field="email"
                                    errors={state.errors}
                                    className="text-red-600 text-sm mt-1"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="subject"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Assunto *
                                </label>
                                <select
                                    id="subject"
                                    name="subject"
                                    required
                                    className="input-field"
                                >
                                    <option value="">Selecione um assunto</option>
                                    <option value="Dúvida sobre Cálculos">Dúvida sobre Cálculos</option>
                                    <option value="Sugestão de Melhoria">Sugestão de Melhoria</option>
                                    <option value="Reportar Problema">Reportar Problema</option>
                                    <option value="Dúvida sobre Investimentos">Dúvida sobre Investimentos</option>
                                    <option value="Parceria/Publicidade">Parceria/Publicidade</option>
                                    <option value="Outro">Outro</option>
                                </select>
                                <ValidationError
                                    prefix="Assunto"
                                    field="subject"
                                    errors={state.errors}
                                    className="text-red-600 text-sm mt-1"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="message"
                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                >
                                    Mensagem *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={6}
                                    className="input-field resize-none"
                                    placeholder="Descreva sua dúvida, sugestão ou problema..."
                                />
                                <ValidationError
                                    prefix="Mensagem"
                                    field="message"
                                    errors={state.errors}
                                    className="text-red-600 text-sm mt-1"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={state.submitting}
                                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {state.submitting ? '📤 Enviando...' : '📨 Enviar Mensagem'}
                            </button>
                        </form>
                    )}
                </div>

                {/* Informações de Contato */}
                <div className="mb-8">
                    <div className="card bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                        <div className="text-3xl mb-3">�</div>
                        <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                            Formulário de Contato
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Use o formulário acima para enviar sua mensagem diretamente
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                            Respondemos em até 48 horas úteis
                        </p>
                    </div>
                </div>

                {/* FAQ Rápido */}
                <div className="card">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                        ❓ Perguntas Frequentes
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                Os cálculos são precisos?
                            </h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Sim! Usamos fórmulas matemáticas corretas e as regras tributárias vigentes.
                                No entanto, são estimativas e não garantem resultados futuros.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                Vocês oferecem consultoria de investimentos?
                            </h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Não. Somos uma ferramenta educacional. Para decisões de investimento,
                                consulte um profissional certificado.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                                O site é gratuito?
                            </h3>
                            <p className="text-sm text-gray-700 dark:text-gray-300">
                                Sim! Todas as funcionalidades são 100% gratuitas. Nos mantemos através
                                de publicidade e links de afiliados.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
