import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Login } from '../containers/Login'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <Login />
  );
}

export default Home
