const usePostLoginFlowMiddleware = ({ event, event_url, onboarding, push }: { event: any, event_url: any, onboarding: any, push: any }) => {
  const handleRedirection = async () => {

    if (onboarding?.show_disclaimer) {
      push(`/${event.url}/auth/disclaimer`);
    } else if (onboarding?.show_gdpr) {
      push(`/${event.url}/auth/gdpr`);
    } else if (onboarding?.show_subregistration) {
      push(`/${event.url}/subRegistration`);
    } else if (onboarding?.show_network_intrest) {
      push(`/${event.url}/network-interest`);
    } else {
      const fromRoute = window.history.state?.as || document.referrer;
      const currentRoute = window.location.pathname;
      if (!fromRoute || fromRoute.includes(currentRoute)) {
        push(`/${event.url}/dashboard`);
      } else {
        push(fromRoute);
      }
    }

  }

  const fetchAccessToken = async () => {
    const access_token_exists = await Boolean(localStorage.getItem(`access_token_${event_url}`));
    if (access_token_exists === false) {
      push(`/${event.url}/auth/login`);
      return;
    }
  }

  if (window.location.pathname.includes('verification') || window.location.pathname.includes('choose-provider') || window.location.pathname.includes('login') || window.location.pathname.includes('reset-password')) {
    return;
  }

  fetchAccessToken();

  if (onboarding && Object.keys(onboarding).length > 0) {
    handleRedirection();
  }
};

export default usePostLoginFlowMiddleware;