import React from 'react';
import heroPhoto from '../assets/hero_photo.png';

const HeroSection = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1>Welcome to PLANit</h1>
            <img src={heroPhoto} alt="Event Planning" style={{ width: '100%', height: 'auto' }} />
        </div>
    );
};

export default HeroSection;