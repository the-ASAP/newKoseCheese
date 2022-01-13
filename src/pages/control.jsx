import React from 'react';
import { MainSection } from 'components/sections/control/MainSection';
import Head from 'next/head';
import MockAPI from 'api/MockAPI';

const Control = ({farm, seo}) => {
    return (
        <>
            <Head>
                <meta name="keywords" content={seo?.meta_keywords || `KO&CO`} />
                <meta name="description" content={seo?.meta_description || `KO&CO`} />
                <title>{seo?.meta_title || `KO&CO`}</title>
            </Head>
            <MainSection farm={farm}/>
        </>
    )
}

export default Control

export const getServerSideProps = async ({ resolvedUrl }) => {
    const { farm, farmCategories } = await MockAPI.getData()
  
    return { props: { resolvedUrl, farmCategories, farm, } };
  };