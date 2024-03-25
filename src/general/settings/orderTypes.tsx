interface IOrderType {
    color: string,
    label: string,
}

export const orderTypes: IOrderType[] = [
    {
        color: 'error.main',
        label: 'Обробка',
    },
    {
        color: 'warning.main',
        label: 'Оплачено',
    },
    {
        color: 'primary.main',
        label: 'Відправлено',
    },
    {
        color: 'success.main',
        label: 'Доставлено',
    },
]