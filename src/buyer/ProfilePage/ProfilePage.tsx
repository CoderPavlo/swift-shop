import React from 'react'
import ProfilePattern from './components/ProfilePattern';
import InfoTab from './components/InfoTab';
import PaymentTab from './components/PaymentTab';
import AddressTab from './components/AddressTab';

export default function ProfilePage() {
    const [selectedTab, setSelectedTab] = React.useState<number>(0);

    return (
        <ProfilePattern
            value={selectedTab}
            onChange={(value) => setSelectedTab(value)}
            tabs={tabs}
            elements={elements}
        />
    )
}

const tabs: string[] = ['Інформація', 'Оплата', 'Адреса доставки']
const elements: React.ReactNode[] = [
    <InfoTab />,
    <PaymentTab />,
    <AddressTab />
]