import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  firstName: yup.string().required('სახელი სავალდებულოა').min(4, 'მინ. 4 სიმბოლო').max(20, 'მაქს. 20 სიმბოლო'),
  lastName: yup.string().required('გვარი სავალდებულოა').min(4, 'მინ. 4 სიმბოლო').max(20, 'მაქს. 20 სიმბოლო'),
  age: yup.number().transform((val, orig) => (orig === '' ? undefined : val)).required('ასაკი სავალდებულოა').min(13, 'მინ. ასაკი 13').max(120, 'მაქს. ასაკი 120'),
  email: yup.string().required('იმეილი სავალდებულოა').email('არასწორი იმეილი'),
  password: yup.string().required('პაროლი სავალდებულოა').min(6, 'მინ. 6 სიმბოლო').max(12, 'მაქს. 12 სიმბოლო').matches(/[A-Z]/, 'მინ. 1 დიდი ასო').matches(/[a-z]/, 'მინ. 1 პატარა ასო').matches(/[0-9]/, 'მინ. 1 რიცხვი'),
  phone: yup.string().required('ტელეფონი სავალდებულოა').matches(/^\d+$/, 'მხოლოდ ციფრები').min(10, 'მინ. 10 ციფრი').max(100, 'მაქს. 100 სიმბოლო'),
}).required();

export default function RegisterForm() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    alert('რეგისტრაცია წარმატებით დასრულდა!');
    reset();
  };

  return (
    <div style={{ maxWidth: '400px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>რეგისტრაციის ფორმა</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div>
          <label>სახელი:</label>
          <input {...register('firstName')} style={{ width: '100%', padding: '6px' }} />
          <span style={{ color: 'red', fontSize: '12px' }}>{errors.firstName?.message}</span>
        </div>
        <div>
          <label>გვარი:</label>
          <input {...register('lastName')} style={{ width: '100%', padding: '6px' }} />
          <span style={{ color: 'red', fontSize: '12px' }}>{errors.lastName?.message}</span>
        </div>
        <div>
          <label>ასაკი:</label>
          <input type="number" {...register('age')} style={{ width: '100%', padding: '6px' }} />
          <span style={{ color: 'red', fontSize: '12px' }}>{errors.age?.message}</span>
        </div>
        <div>
          <label>იმეილი:</label>
          <input type="email" {...register('email')} style={{ width: '100%', padding: '6px' }} />
          <span style={{ color: 'red', fontSize: '12px' }}>{errors.email?.message}</span>
        </div>
        <div>
          <label>პაროლი:</label>
          <input type="password" {...register('password')} style={{ width: '100%', padding: '6px' }} />
          <span style={{ color: 'red', fontSize: '12px' }}>{errors.password?.message}</span>
        </div>
        <div>
          <label>ტელეფონი:</label>
          <input {...register('phone')} style={{ width: '100%', padding: '6px' }} />
          <span style={{ color: 'red', fontSize: '12px' }}>{errors.phone?.message}</span>
        </div>
        <button type="submit" style={{ padding: '10px', background: '#007BFF', color: '#fff', border: 'none', cursor: 'pointer' }}>რეგისტრაცია</button>
      </form>
    </div>
  );
}