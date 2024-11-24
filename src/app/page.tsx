"use client"

import styles from "./page.module.css";
import {useEffect, useState} from "react";
import {Fight, FightsMock} from "@/types/fights";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const [fights, setFights] = useState<Fight[]>(FightsMock);
  const [userBalance, setUserBalance] = useState(5000);

  // useEffect(() => {
  //     const fetchFightsAndBalance = async () => {
  //         try {
  //             const fightsResponse = await axios.get('http://localhost:6969/fights');
  //             setFights(fightsResponse.data.fights);
  //             const userBalanceResponse = await axios.get(`http://localhost:6969/user/balance`);
  //             setUserBalance(userBalanceResponse.data.balance);
  //         } catch (error) {
  //             console.error('Ошибка при получении данных:', error);
  //         }
  //     };
  //
  //     fetchFightsAndBalance();
  // }, []);

  return (
      <div className={styles.container}>
        <div className={styles.banner}>
          <div className={styles.textContainer}>
            <div className={styles.title}>
              Получи свой шанс провести бой и стать победителем
            </div>
            <div className={styles.subtitle}>
              Это возможность выиграть 500 000 рублей
            </div>
            <button>Играть</button>
          </div>
          <Image className={styles.mainImage} src={'/public/images/main_banner.png'} alt="Pokemons" width={500} height={200}/>
        </div>
        <div className="top-bar">
          <div className="balance">Баланс: {userBalance.toFixed(2)} кредитов</div>
          <Link className="profile-icon" href="/profile">Профиль</Link>
        </div>
        <h1>Главная страница</h1>
        <Link href="/create-fight">Создать бой</Link>
        <Link href="/top-up">Пополнить баланс</Link>
        {fights.map((fight) => (
            <Link key={fight.id} className="fight-card" href={`/fight/${fight.id}`}>
              <h3>Бой №{fight.id}</h3>
              <p>Первый Покемон: {fight.firstPokemon.name} (Тип: {fight.firstPokemon.types.join(', ')}, Тренер: {fight.firstPokemon.trainer?.name})</p>
              <p>Коэффициент на победу: {fight.coefficientFirst.toFixed(2)}</p>
              <p>Второй Покемон: {fight.secondPokemon.name} (Тип: {fight.secondPokemon.types.join(', ')}, Тренер: {fight.secondPokemon.trainer?.name})</p>
              <p>Коэффициент на победу: {fight.coefficientSecond.toFixed(2)}</p>
              <p>Место проведения: {fight.location.name}</p>
              <p>Статус боя: {fight.isCompleted ? 'Завершен' : 'Не завершен'}</p>
              {fight.firstWon && <p>Победил покемон номер {fight.firstWon ? 1 : 2}</p>}
            </Link>
        ))}
      </div>
  );
}
