const usePostLoginFlowMiddleware = ({ event, event_url, loadSettingsModules, isLoggedIn, response, push }: { event: any, event_url: any, loadSettingsModules: any, isLoggedIn: any, response: any, push: any }) => {
  const handleRedirection = async () => {
      const access_token_exists = await Boolean(localStorage.getItem(`access_token_${event_url}`));
      if (access_token_exists === false) {
        console.log("🚀 ~ handleRedirection ~ access_token_exists:", access_token_exists)
        push(`/${event.url}/auth/login`);
        return;
      }
      await loadSettingsModules();

      const checkUserGDPR = () => {
        const requiredGDPR = event?.gdpr_settings?.enable_gdpr === 1;
        const userGDPRLogged = response?.data?.user?.gdpr_log;
        if (userGDPRLogged === undefined) {
          return false;
        }
        return requiredGDPR && !userGDPRLogged;
      };
      let showGDPR = await checkUserGDPR();
      
      const sub_reg_skip = localStorage.getItem(`skip_sub_reg_${event_url}`) === 'true' ? true : false;
      const keyword_skip = localStorage.getItem(`keyword_skip_${event_url}`) === 'true' ? true : false;

      if (response.redirect === "disclaimer" || response?.data?.user?.show_disclaimer) {
        push(`/${event.url}/auth/disclaimer`);
      } else if (showGDPR) {
        push(`/${event.url}/auth/gdpr`);
      } else if (!sub_reg_skip) {
        push(`/${event.url}/subRegistration`);
      } else if (!keyword_skip) {
        push(`/${event.url}/network-interest`);
      }
      else {
        const fromRoute = window.history.state?.as || document.referrer;
        if (!fromRoute) {
          push(`/${event.url}/dashboard`);
        } else {
          push(fromRoute);
      }
    }
  };

  if (window.location.pathname.includes('verification') || window.location.pathname.includes('choose-provider') || window.location.pathname.includes('login') || window.location.pathname.includes('reset-password')) {
    return;
  }
  handleRedirection();
};

export default usePostLoginFlowMiddleware;