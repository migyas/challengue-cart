import * as yup from 'yup';

export default function validations() {
    return yup.object().shape({
        name: yup.string().required('Digite seu nome'),
        email: yup
            .string()
            .email('Digite um e-mail válido.')
            .required('E-mail obrigátorio!'),
        cpf: yup.string().required('CPF obrigátorio'),
        cep: yup.string().required('Digite seu CEP'),
        bairro: yup.string('Informar bairro'),
        rua: yup.string('Informar rua'),
        numero: yup.string().required('Informar complemento')
    });
}
