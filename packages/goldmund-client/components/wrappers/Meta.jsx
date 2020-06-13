import Head from 'next/head';
import { useRouter } from 'next/router'

const Meta = (props) => {
    const router = useRouter();
    let { tags } = props
    let path = `${router.pathname === "/" ? "vestibule" : router.asPath.split("/").slice(-1)} ${ router.query.search ? `:: ${router.query.search}` : ""}`
    let content = tags ? `A blog post about ${tags.join(", ")}, among other things. | goldmund.sh automated cluster` : "An automated rabbit hole. Endeavors into computer-science, arts, and philosophy. | goldmund.sh"
  return (
    <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={content} />
        <meta name="msapplication-tap-highlight" content="no" />
        <link rel="shortcut icon" href="/static/assets/favicon.ico" type="image/x-icon" />
        <title>Goldmund.sh | automated cluster :: {path} </title>
    </Head>
  )
}

export default Meta;
