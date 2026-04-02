"use client";
import { useState, useEffect, type FormEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { getMe, updateMe } from '../../../../lib/api/clientApi';
import css from './EditProfilePage.module.css';

export default function EditProfile() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    getMe().then((user) => {
      setUsername(user.username ?? '');
      setEmail(user.email);
      setAvatar(user.avatar ?? '');
    });
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateMe({ username });
    router.push('/profile');
  };

  const handleCancel = () => {
    router.push('/profile');
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>
        <Image
          src={avatar || 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg'}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />
        <form className={css.profileInfo} onSubmit={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <p>Email: {email}</p>
          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>Save</button>
            <button type="button" className={css.cancelButton} onClick={handleCancel}>Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
}
