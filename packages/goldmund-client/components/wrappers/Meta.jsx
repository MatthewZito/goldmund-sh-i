import Head from 'next/head';
import { useRouter } from 'next/router'

const Meta = (props) => {
    const router = useRouter(); 

    /* Metadata */
    let { tags } = props

    // take page title and strip all hyphens, capitalize each word in string
    let normalizedPath = () => {
        let tmpPath = router.asPath.split("/").slice(-1)[0]; 
        tmpPath = tmpPath.replace(/-/gi, " ");
        tmpPath = tmpPath.replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase());
        return tmpPath
    } 

    let path = `${router.pathname === "/" ? "Vestibule" : normalizedPath()} ${ router.query.search ? `:: ${router.query.search}` : ""}`
    let content = tags ? `A blog post about ${tags.join(", ")}, among other things. | goldmund.sh automated cluster` : "An automated curiosity engine built for the web. Endeavors into computer-science, arts, and philosophy. | goldmund.sh"
  
    return (
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="description" content={content} />
            <meta name="msapplication-tap-highlight" content="no" />
            <link rel="shortcut icon" href="/assets/favicon.ico" type="image/x-icon" />
            <title>Goldmund.sh | {path} </title>
        </Head>
    )
}

export default Meta;
