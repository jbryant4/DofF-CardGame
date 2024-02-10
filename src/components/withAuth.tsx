import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';
import LoadingCardCircle from '@/LoadingCardCircle';
import { authCookie } from '~/constants/cookies';
import { useCollector } from '~/context/CollectorContext';

/**

This is a higher order component(HOC) that should be wraps every page component in this application.
This HOC will verify if users are logged in based on a token stored in the cookie DoFAuthToken. If token is not found will
 route user to our login page '/gateway'. If a token is found, we will call our user api to get user data and store it in
 CollectorContext. To be more performant and not call the api on every serverSideRender you can pass the query hasData on internal
 routing in the app. This will skip the call to the api and if in the url we will remove the query just in case the user refreshes the page
 we loose data in our context
 *
 @example
 import withAuth, {
 getServerSideProps as getServerSideAuthProps
 } from '@/withAuth';


 const CardPage = () => {
      <PageCode/>
 };

 export default withAuth(CardPage);

 export async function getServerSideProps(ctx: GetServerSidePropsContext) {
 const authProps = await getServerSideAuthProps(ctx);

 const pageProps = await getPageProps(ctx);


 return { props: { ...authProps.props, ...pageProps.props } };
 }

 */

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const cookies = parseCookies(ctx);
  const token = cookies[authCookie];

  // Check for 'hasData' in the URL query parameters
  const hasData = ctx.query.hasData;

  // If there's no JWT cookie, redirect to the login page
  if (!cookies[authCookie]) {
    ctx.res.writeHead(302, { Location: '/gateway' });
    ctx.res.end();

    return { props: {} };
  }

  // If there's a JWT but 'hasData' is 'false', fetch the user data
  if (cookies[authCookie] && !hasData) {
    let baseUrl = '';
    if (ctx.req) {
      // Server side
      baseUrl = `${ctx.req.headers['x-forwarded-proto'] || 'http'}://${
        ctx.req.headers.host
      }`;
    } else {
      // Client side (this shouldn't happen in getServerSideProps, but just in case)
      baseUrl =
        window.location.protocol +
        '//' +
        window.location.hostname +
        (window.location.port ? ':' + window.location.port : '');
    }

    const response = await fetch(`${baseUrl}/api/collector/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ authString: token })
    });

    return { props: { collector: await response.json() } };
  }

  // If there's a JWT and 'hasData' is 'true', don't fetch the user data
  return { props: {} };
}

// This is the HOC that wraps your pages
export default function withAuth(Page) {
  return function AuthenticatedPage(props) {
    const { isLoggedIn, collector, setCollector } = useCollector();
    const router = useRouter();
    //remove query from url
    useEffect(() => {
      const { hasData, ...rest } = router.query;
      if (hasData === 'true') {
        // Check if the code is running on the client side
        if (typeof window !== 'undefined') {
          // Use replaceState to update the URL without triggering a navigation event
          // window.history.replaceState({}, '', `${window.location.pathname}`);
          void router.replace(
            {
              pathname: router.pathname,
              query: { ...rest }
            },
            {},
            { shallow: true }
          );
        }
      }
    }, [router]);

    useEffect(() => {
      if (collector) return;
      setCollector(props.collector);
    }, [collector, props, props.collector, setCollector]);

    // Render the page component
    return isLoggedIn ? <Page {...props} /> : <LoadingCardCircle />;
  };
}
