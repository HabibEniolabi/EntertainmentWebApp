import React from 'react';
import Image, { StaticImageData } from 'next/image';
import styles from "./styles.module.scss";


interface ProfileProps {
    image: string | StaticImageData;
}

const Profile = ({image}: ProfileProps) => {
  return (
      <div className={styles.profile}>
        <Image src={typeof image === 'string' ? image : image.src} width={40} height={40} alt="Profile" className='w-full h-full object-cover'/>
      </div>
  );
}

export default Profile;
