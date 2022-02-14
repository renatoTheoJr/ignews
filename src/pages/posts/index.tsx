import styles from './styles.module.scss';

import Head from 'next/head';
import { GetStaticProps } from 'next';
import { getPrismicClient } from '../../services/prismic';
import  Prismic  from '@prismicio/client';
export default function Posts(){
    return (
    <>
    <Head>
        <title>Posts | Ignews</title>

    </Head>
    <main className={styles.container}>
        <div className={styles.posts}>
            <a href='#'>
                <time>13 de Fevereiro de 2022</time>
                <strong>Esse é o titulo da noticias</strong>
                <p>Esse paragráfo sera o conteúdo visível para o consumidor final</p>

            </a>
            <a>
                <time>13 de Fevereiro de 2022</time>
                <strong>Esse é o titulo da noticias</strong>
                <p>Esse paragráfo sera o conteúdo visível para o consumidor final</p>

            </a>
            <a>
                <time>13 de Fevereiro de 2022</time>
                <strong>Esse é o titulo da noticias</strong>
                <p>Esse paragráfo sera o conteúdo visível para o consumidor final</p>

            </a>
        </div>
    </main>
    </>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.query([
        Prismic.predicates.at('document.type', 'post')
    ],{
        fetch:['post.title', 'post.content'],
        pageSize: 100,
    })
    
    return {
        props: {}
    }
}