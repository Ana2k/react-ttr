import { useState } from 'react'

const user = {
    name: 'Hedy Lamarr',
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
    imageSize: 90,
    bio: 'Inventor and actress known for her work in frequency-hopping spread spectrum technology.',
    interests: ['Technology', 'Acting', 'Science', 'Innovation']
};

export default function Profile() {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="profile-card">
            <h2>{user.name}</h2>
            <img
                className="avatar"
                src={user.imageUrl}
                alt={'Photo of ' + user.name}
                style={{ width: user.imageSize, height: user.imageSize }}
            />
            <p className="bio">{user.bio}</p>
            <button 
                className="expand-button"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? 'Show Less' : 'Show More'}
            </button>
            {isExpanded && (
                <div className="interests">
                    <h3>Interests:</h3>
                    <ul>
                        {user.interests.map((interest, index) => (
                            <li key={index}>{interest}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
} 