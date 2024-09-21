import React from 'react';
import { CFormCheck, CImage } from '@coreui/react-pro';

interface RadioOption {
    id: string;
    image_src: string;
    text: string;
}

interface RadioComponentProps {
    options: RadioOption[];
    selectedOptionId: string;
    onChange: (id: string) => void;
}

const RadioComponent: React.FC<RadioComponentProps> = ({ options, selectedOptionId, onChange }) => {
    const handleOptionChange = (id: string) => {
        onChange(id);
    };

    return (
        <div>
            {options.map((option) => (
                <div
                    key={option.id}
                    className="d-flex align-items-center cursor-pointer mb-2 w-100 d-flex justify-content-between p-3 border border-secondary fw-bold"
                    onClick={() => handleOptionChange(option.id)}
                >
                    <div className='d-flex justify-content-between'>
                        <CImage src={option.image_src} width={40} />
                        <span className='ms-5'>{option.text}</span>
                    </div>
                    <CFormCheck type="radio" id={option.id} checked={selectedOptionId === option.id} onChange={() => { }} className='ps-5' />
                </div>
            ))}
        </div>
    );
};

export default RadioComponent;
