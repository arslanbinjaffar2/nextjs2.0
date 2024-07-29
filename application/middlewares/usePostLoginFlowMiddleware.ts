const usePostLoginFlowMiddleware = ({ event, event_url, loadSettingsModules, isLoggedIn, response, push }: { event: any, event_url: any, loadSettingsModules: any, isLoggedIn: any, response: any, push: any }) => {
  console.log(event_url)
  const handleRedirection = async () => {
      const access_token_exists = await Boolean(localStorage.getItem(`access_token_${event_url}`));
      if (!isLoggedIn || response.redirect === "login" || access_token_exists === false) {
        push(`/${event.url}/auth/login`);
        return;
      }
      await loadSettingsModules();

      const checkUserGDPR = () => {
        const requiredGDPR = event?.gdpr_settings?.enable_gdpr === 1;
        const userGDPRLogged = response?.data?.user?.gdpr_log;
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
      } else {
        push(`/${event.url}/dashboard`);
      }
    };

    handleRedirection();
};

export default usePostLoginFlowMiddleware;