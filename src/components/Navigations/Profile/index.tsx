import React from 'react';
import Image, { StaticImageData } from 'next/image';


interface ProfileProps {
    image: string | StaticImageData;
}

const Profile = ({image}: ProfileProps) => {
  return (
      <div className='w-[40px] h-[40px] rounded-full overflow-hidden border-2 border-white'>
        <Image src={typeof image === 'string' ? image : image.src} width={40} height={40} alt="Profile" className='w-full h-full object-cover'/>
      </div>
  );
}

export default Profile;
