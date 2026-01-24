const ui = {
      navHome: document.getElementById("nav-home"),
      navExplore: document.getElementById("nav-explore"),
      navChannels: document.getElementById("nav-channels"),
      navRequests: document.getElementById("nav-requests"),
      railHome: document.getElementById("rail-home"),
      railViral: document.getElementById("rail-viral"),
      railChannels: document.getElementById("rail-channels"),
      accountChip: document.getElementById("account-chip"),
      accountAvatar: document.getElementById("account-avatar"),
      accountName: document.getElementById("account-name"),
      accountPlan: document.getElementById("account-plan"),
      heroIdentity: document.getElementById("hero-identity"),
      heroPlay: document.getElementById("hero-play"),
      heroChannels: document.getElementById("hero-channels"),
      settingsBar: document.getElementById("settings-bar"),
      drawerToggle: document.getElementById("drawer-toggle"),
      drawerClose: document.getElementById("drawer-close"),
      actionDrawer: document.getElementById("action-drawer"),
      drawerOverlay: document.getElementById("drawer-overlay"),
      themeToggle: document.getElementById("theme-toggle"),
      viewTheater: document.getElementById("view-theater"),
      viewMini: document.getElementById("view-mini"),
      playerArea: document.getElementById("player-area"),
      controlDock: document.getElementById("control-dock"),
      controlsToggle: document.getElementById("controls-toggle"),
      searchForm: document.getElementById("search-form"),
      searchInput: document.getElementById("search-input"),
      channelList: document.getElementById("channel-list"),
      channelsOpen: document.getElementById("channels-open"),
      channelsPage: document.getElementById("channels-page"),
      channelsPageList: document.getElementById("channels-page-list"),
      channelsSearch: document.getElementById("channels-search"),
      channelsSort: document.getElementById("channels-sort"),
      channelsFilterSubscribed: document.getElementById("channels-filter-subscribed"),
      channelsLoadMore: document.getElementById("channels-load-more"),
      channelsBack: document.getElementById("channels-back"),
      subscribedList: document.getElementById("subscribed-list"),
      recommendations: document.getElementById("recommendations-grid"),
      loadMore: document.getElementById("load-more"),
      searchView: document.getElementById("search-view"),
      searchGrid: document.getElementById("search-grid"),
      searchEmpty: document.getElementById("search-empty"),
      searchFallback: document.getElementById("search-fallback"),
      searchFallbackRecommended: document.getElementById("search-fallback-recommended"),
      searchFallbackViral: document.getElementById("search-fallback-viral"),
      searchLoadMore: document.getElementById("search-load-more"),
      searchTitle: document.getElementById("search-title"),
      searchBack: document.getElementById("search-back"),
      searchContext: document.getElementById("search-context"),
      filterSubscribed: document.getElementById("filter-subscribed"),
      feedView: document.getElementById("feed-view"),
      viralView: document.getElementById("viral-view"),
      requestView: document.getElementById("request-view"),
      channelView: document.getElementById("channel-view"),
      adminOverviewPage: document.getElementById("admin-overview-page"),
      adminOverviewPageList: document.getElementById("admin-overview-page-list"),
      adminOverviewBack: document.getElementById("admin-overview-back"),
      adminUsersPage: document.getElementById("admin-users-page"),
      adminUsersPageList: document.getElementById("admin-users-page-list"),
      adminUsersSearchPage: document.getElementById("admin-users-search-page"),
      adminUsersLoadMore: document.getElementById("admin-users-load-more"),
      adminUsersBack: document.getElementById("admin-users-back"),
      adminChannelsPage: document.getElementById("admin-channels-page"),
      adminChannelsPageList: document.getElementById("admin-channels-page-list"),
      adminChannelsSearchPage: document.getElementById("admin-channels-search-page"),
      adminChannelsLoadMore: document.getElementById("admin-channels-load-more"),
      adminChannelsBack: document.getElementById("admin-channels-back"),
      adminVideosPage: document.getElementById("admin-videos-page"),
      adminVideosPageList: document.getElementById("admin-videos-page-list"),
      adminVideosSearchPage: document.getElementById("admin-videos-search"),
      adminVideosLoadMore: document.getElementById("admin-videos-load-more"),
      adminVideosBack: document.getElementById("admin-videos-back"),
      adminReportsPage: document.getElementById("admin-reports-page"),
      adminReportsPageList: document.getElementById("admin-reports-page-list"),
      adminReportsBack: document.getElementById("admin-reports-back"),
      adminImportsPage: document.getElementById("admin-imports-page"),
      adminImportsBack: document.getElementById("admin-imports-back"),
      channelTitle: document.getElementById("channel-title"),
      channelStats: document.getElementById("channel-stats"),
      channelSloganView: document.getElementById("channel-slogan-view"),
      channelVideos: document.getElementById("channel-videos"),
      channelBack: document.getElementById("channel-back"),
      channelSubscribe: document.getElementById("channel-subscribe"),
      playerHost: document.getElementById("player"),
      playerShell: document.getElementById("player-shell"),
      videoTitle: document.getElementById("video-title"),
      videoStats: document.getElementById("video-stats"),
      channelAvatar: document.getElementById("channel-avatar"),
      channelName: document.getElementById("channel-name"),
      channelSlogan: document.getElementById("channel-slogan"),
      statusChip: document.getElementById("status-chip"),
      stateSignal: document.getElementById("state-signal"),
      stateSignalIcon: document.getElementById("state-signal-icon"),
      stateSignalLabel: document.getElementById("state-signal-label"),
      seekSignal: document.getElementById("seek-signal"),
      seekSignalIcon: document.getElementById("seek-signal-icon"),
      seekSignalLabel: document.getElementById("seek-signal-label"),
      loadingLayer: document.getElementById("loading-layer"),
      startLayer: document.getElementById("start-layer"),
      endCard: document.getElementById("end-card"),
      nextUp: document.getElementById("next-up"),
      playToggle: document.getElementById("controls-play"),
      muteToggle: document.getElementById("controls-mute"),
      volumeDown: document.getElementById("controls-volume-down"),
      volumeUp: document.getElementById("controls-volume-up"),
      volumeLevel: document.getElementById("volume-level"),
      autoNextToggle: document.getElementById("controls-auto-next"),
      seekBar: document.getElementById("seek-bar"),
      timeCurrent: document.getElementById("time-current"),
      timeDuration: document.getElementById("time-duration"),
      authGate: document.getElementById("auth-gate"),
      requestForm: document.getElementById("request-form"),
      requestReason: document.getElementById("request-reason"),
      requestDetails: document.getElementById("request-details"),
      requestContact: document.getElementById("request-contact"),
      requestMessage: document.getElementById("request-message"),
      uploadModal: document.getElementById("upload-modal"),
      adminModal: document.getElementById("admin-modal"),
      settingsModal: document.getElementById("settings-modal"),
      settingsAuthModal: document.getElementById("settings-auth-modal"),
      authOpen: document.getElementById("auth-open"),
      authLogout: document.getElementById("auth-logout"),
      uploadOpen: document.getElementById("upload-open"),
      adminOpen: document.getElementById("admin-open"),
      adminNav: document.getElementById("admin-nav"),
      adminOverviewOpen: document.getElementById("admin-overview-open"),
      adminUsersOpen: document.getElementById("admin-users-open"),
      adminChannelsOpen: document.getElementById("admin-channels-open"),
      adminReportsOpen: document.getElementById("admin-reports-open"),
      adminImportsOpen: document.getElementById("admin-imports-open"),
      adminVideosOpen: document.getElementById("admin-videos-open"),
      channelsPageOpen: document.getElementById("channels-page-open"),
      settingsOpen: document.getElementById("settings-open"),
      notificationsOpen: document.getElementById("notifications-open"),
      contactOpen: document.getElementById("contact-open"),
      loginForm: document.getElementById("login-form"),
      registerForm: document.getElementById("register-form"),
      verifyResend: document.getElementById("verify-resend"),
      forgotPassword: document.getElementById("forgot-password"),
      uploadForm: document.getElementById("upload-form"),
      settingsForm: document.getElementById("settings-form"),
      settingsAuthForm: document.getElementById("settings-auth-form"),
      reportForm: document.getElementById("report-form"),
      authMessage: document.getElementById("auth-message"),
      uploadMessage: document.getElementById("upload-message"),
      settingsMessage: document.getElementById("settings-message"),
      settingsAuthMessage: document.getElementById("settings-auth-message"),
      historyList: document.getElementById("history-list"),
      settingsTopicSearch: document.getElementById("topic-search"),
      settingsTopics: document.getElementById("settings-topics"),
      settingsChannelSearch: document.getElementById("channel-search"),
      settingsChannels: document.getElementById("settings-channels"),
      settingsReligions: document.getElementById("settings-religions"),
      uploadTopics: document.getElementById("upload-topics"),
      topicsList: document.getElementById("topics-list"),
      maxWatch: document.getElementById("max-watch"),
      settingsPassword: document.getElementById("settings-password"),
      settingsAuthPassword: document.getElementById("settings-auth-password"),
      viralGrid: document.getElementById("viral-grid"),
      profileForm: document.getElementById("profile-form"),
      profileMessage: document.getElementById("profile-message"),
      profileName: document.getElementById("profile-name"),
      profileSlogan: document.getElementById("profile-slogan"),
      profileAvatar: document.getElementById("profile-avatar"),
      adminList: document.getElementById("admin-list"),
      adminStats: document.getElementById("admin-stats"),
      adminOverview: document.getElementById("admin-overview"),
      adminUsers: document.getElementById("admin-users"),
      adminChannels: document.getElementById("admin-channels"),
      adminVideos: document.getElementById("admin-videos"),
      adminReportsPanel: document.getElementById("admin-reports-panel"),
      adminImports: document.getElementById("admin-imports"),
      adminTabs: document.querySelectorAll(".admin-tab"),
      adminUserSearch: document.getElementById("admin-user-search"),
      adminChannelSearch: document.getElementById("admin-channel-search"),
      adminVideoSearch: document.getElementById("admin-video-search"),
      adminChannelsList: document.getElementById("admin-channels-list"),
      adminVideosList: document.getElementById("admin-videos-list"),
      uploadMetadata: document.getElementById("upload-metadata"),
      studioModal: document.getElementById("studio-modal"),
      statsSummary: document.getElementById("stats-summary"),
      artistStats: document.getElementById("artist-stats"),
      manageList: document.getElementById("manage-list"),
      adminCsv: document.getElementById("admin-csv"),
      adminSql: document.getElementById("admin-sql"),
      adminImportCsv: document.getElementById("admin-import-csv"),
      adminImportSql: document.getElementById("admin-import-sql"),
      adminExportSql: document.getElementById("admin-export-sql"),
      adminImportMessage: document.getElementById("admin-import-message"),
      adminCsvPage: document.getElementById("admin-csv-page"),
      adminSqlPage: document.getElementById("admin-sql-page"),
      adminImportCsvPage: document.getElementById("admin-import-csv-page"),
      adminImportSqlPage: document.getElementById("admin-import-sql-page"),
      adminExportSqlPage: document.getElementById("admin-export-sql-page"),
      adminImportMessagePage: document.getElementById("admin-import-message-page"),
      adminReports: document.getElementById("admin-reports"),
      uiLanguage: document.getElementById("ui-language"),
      controlsHeart: document.getElementById("controls-heart"),
      controlsReport: document.getElementById("controls-report"),
      controlsReplay: document.getElementById("controls-replay"),
      controlsNext: document.getElementById("controls-next"),
      controlsSeekBack: document.getElementById("controls-seek-back"),
      controlsSeekForward: document.getElementById("controls-seek-forward"),
      controlsFullscreen: document.getElementById("controls-fullscreen"),
      qualitySelect: document.getElementById("quality-select"),
      captionSelect: document.getElementById("caption-select"),
      reportModal: document.getElementById("report-modal"),
      reportMessage: document.getElementById("report-message"),
      notificationsModal: document.getElementById("notifications-modal"),
      notificationsList: document.getElementById("notifications-list"),
      contactModal: document.getElementById("contact-modal"),
      signoutModal: document.getElementById("signout-modal"),
      signoutForm: document.getElementById("signout-form"),
      signoutMessage: document.getElementById("signout-message"),
      fullscreenExitBtn: document.getElementById("fullscreen-exit-btn")
    };

    const icons = {
      play:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M8 5v14l11-7z\"/></svg>",
      pause:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M6 5h4v14H6zm8 0h4v14h-4z\"/></svg>",
      volume:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 9v6h4l5 5V4L9 9H5z\"/></svg>",
      mute:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 9v6h4l5 5V4L9 9H5z\"/><path d=\"M16 8l4 4m0-4-4 4\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></svg>",
      minus:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 12h14\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></svg>",
      plus:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 5v14m-7-7h14\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></svg>",
      check:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M5 13l4 4L19 7\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></svg>",
      autoNext:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M4 17V7l8 5-8 5zm10 0V7l8 5-8 5z\"/></svg>",
      heart:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 21s-7-4.4-9.3-8.2C1 9.3 3.3 6 6.7 6c2 0 3.4 1.1 4.3 2.3C11.9 7.1 13.3 6 15.3 6 18.7 6 21 9.3 21 12.8 19.3 16.6 12 21 12 21z\"/></svg>",
      report:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 2 1 21h22L12 2zm0 7v5m0 4h.01\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></svg>",
      replay:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 5v4l5-5-5-5v4a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7z\"/></svg>",
      next:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M6 18 14.5 12 6 6v12zm10-12h2v12h-2z\"/></svg>",
      sun:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0-4v3m0 14v3m10-10h-3M5 12H2m15.5-7.5-2.1 2.1M8.6 15.4 6.5 17.5m11 0-2.1-2.1M8.6 8.6 6.5 6.5\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></svg>",
      moon:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M21 14.5A8.5 8.5 0 1 1 9.5 3 7 7 0 0 0 21 14.5z\"/></svg>",
      theater:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M3 5h18v12H3z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M7 19h10\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>",
      mini:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M4 6h16v12H4z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M12 12h6v4h-6z\"/></svg>",
      bars:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M4 7h16M4 12h16M4 17h16\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></svg>",
      dockHide:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M6 14l6-6 6 6\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></svg>",
      dockShow:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M6 10l6 6 6-6\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></svg>",
      users:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z\"/></svg>",
      channels:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M4 6h16v3H4zM4 11h10v3H4zM4 16h16v3H4z\"/></svg>",
      reports:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 3 2 21h20L12 3zm0 6v5m0 4h.01\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></svg>",
      imports:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 3v10m0 0-4-4m4 4 4-4M5 19h14\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></svg>",
      upload:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 16V5m0 0-4 4m4-4 4 4M5 19h14\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></svg>",
      admin:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5l-8-3z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/></svg>",
      studio:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M4 19V5m6 14V9m6 10V12m4 7H2\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></svg>",
      settings:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm9 4-2.1-.7.3-2.2-2.1-1.2-1.4 1.7-2.1-.7-.7-2.1H11l-.7 2.1-2.1.7-1.4-1.7-2.1 1.2.3 2.2L3 12l2.1.7-.3 2.2 2.1 1.2 1.4-1.7 2.1.7.7 2.1h2.2l.7-2.1 2.1-.7 1.4 1.7 2.1-1.2-.3-2.2L21 12z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/></svg>",
      bell:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M6 17h12l-1.5-2V10a4.5 4.5 0 1 0-9 0v5L6 17z\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M10 19a2 2 0 0 0 4 0\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\"/></svg>",
      user:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4zm0 2c-4 0-7 2-7 4v2h14v-2c0-2-3-4-7-4z\"/></svg>",
      logout:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M10 17l5-5-5-5\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M15 12H3\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/><path d=\"M19 5h2v14h-2\"/></svg>"
      ,
      sparkle:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M12 3l1.8 4.7L18 9.5l-4.2 1.8L12 16l-1.8-4.7L6 9.5l4.2-1.8L12 3z\" fill=\"currentColor\"/><circle cx=\"18\" cy=\"5\" r=\"2\" fill=\"currentColor\"/><circle cx=\"5\" cy=\"18\" r=\"2\" fill=\"currentColor\"/></svg>",
      fullscreen:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M4 4h6v2H6v4H4V4zm10 0h6v6h-2V6h-4V4zm4 10h2v6h-6v-2h4v-4zM4 14h2v4h4v2H4v-6z\"/></svg>",
      exitFullscreen:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M9 5v2H6v3H4V5h5zm6 0h5v5h-2V7h-3V5zM4 14h2v3h3v2H4v-5zm14 0h2v5h-5v-2h3v-3z\"/></svg>"
      ,
      seekBack:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M11 7v10l-6-5 6-5zm1 5a5 5 0 1 1 5 5\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></svg>",
      seekForward:
        "<svg viewBox=\"0 0 24 24\" aria-hidden=\"true\"><path d=\"M13 7v10l6-5-6-5zm-1 5a5 5 0 1 0-5 5\" stroke=\"currentColor\" stroke-width=\"2\" fill=\"none\" stroke-linecap=\"round\"/></svg>"
    };

    const translations = {
      en: {
        search_label: "Search",
        sidebar_toggle: "Toggle sidebar",
        sidebar_show: "Show sidebar",
        controls_hide: "Hide controls",
        controls_show: "Show controls",
        tech_panel_toggle: "Toggle player tools",
        search_placeholder: "Search videos and channels",
        request_title: "Make a request",
        request_subtitle: "Tell us what you need and we'll prepare it.",
        request_reason: "Reason",
        request_video: "Request videos from a YouTube channel",
        request_partnership: "Partnership",
        request_feature: "New functionality",
        request_pro: "Free Pro for 1 month",
        request_details_label: "Details",
        request_details_placeholder: "Channel name, link, or what you want to see",
        request_contact_label: "How to reach you",
        request_contact_placeholder: "Email or phone",
        request_success: "Request sent. We'll get back to you.",
        request_error: "Couldn't send. Try again.",
        request_required: "Please fill all fields.",
        ui_language_label: "Language",
        sidebar_subscribed: "Subscribed",
        sidebar_channels: "Channels",
        status_loading: "Loading",
        player_loading: "Preparing the player...",
        overlay_ready: "Ready to play",
        overlay_tap_start: "Tap play to start",
        overlay_autoplay_note: "Autoplay can be blocked. Tap play to begin.",
        overlay_complete: "All done!",
        overlay_next_prompt: "Watch another one?",
        overlay_next_copy: "Replay or pick the next video.",
        video_select: "Select a video",
        timeline_label: "Video timeline",
        timeline_seek: "Seek video timeline",
        quality_auto: "Auto",
        captions_label: "Captions language",
        captions_off: "Captions off",
        feed_recommended: "Recommended",
        feed_filter_hint: "Subscribed only",
        feed_intro: "Fresh picks for happy watching",
        feed_subscribed: "Only channels you follow",
        feed_load_hint: "More videos below",
        feed_load_more: "Load more",
        feed_viral: "Viral",
        channel_title: "Channel",
        search_results: "Results for",
        search_title: "Search results",
        search_back: "Back to feed",
        search_no_results: "No matches. Try another word.",
        search_fallback_recommended: "Recommended",
        search_fallback_viral: "Viral",
        channels_open: "All channels",
        channels_title: "Channels",
        channels_back: "Back to feed",
        channels_search_hint: "Find a channel",
        channels_search_placeholder: "Search channels",
        channels_sort: "Sort channels",
        channels_sort_popular: "Most popular",
        channels_sort_videos: "Most videos",
        channels_sort_name: "A-Z",
        channels_filter_subscribed: "Subscribed only",
        auth_welcome: "Welcome, parents!",
        auth_subtitle: "Create a safe, happy space for kids. Sign in or make an account to begin.",
        auth_email: "Email",
        auth_password: "Password",
        auth_sign_in: "Sign in",
        auth_new_email: "New email",
        auth_new_password: "New password",
        auth_create_account: "Create account",
        auth_resend: "Resend verification email",
        auth_forgot: "Forgot password",
        auth_sign_out: "Sign out",
        settings_unlock_title: "Parent check",
        settings_unlock_copy: "Enter your password to open parent controls.",
        upload_title: "Add YouTube video",
        upload_url: "YouTube URL",
        upload_url_placeholder: "https://www.youtube.com/watch?v=...",
        upload_languages: "Languages",
        upload_topics: "Topics (comma separated)",
        upload_topics_placeholder: "nastya, masha, minecraft",
        upload_religion: "Religion",
        upload_religion_detail: "Religion detail (optional)",
        religion_none: "No religion",
        religion_islam: "Islam",
        religion_shia: "Islam · Shia",
        religion_christian: "Christian",
        religion_jews: "Jews",
        religion_buddist: "Buddist",
        upload_add: "Add video",
        upload_hint: "Title will auto-fill from YouTube when available.",
        admin_title: "Admin controls",
        admin_overview: "Admin overview",
        admin_users: "Admin users",
        admin_channels: "Admin channels",
        admin_imports: "Admin imports",
        admin_overview_title: "Admin overview",
        admin_users_title: "Admin users",
        admin_channels_title: "Admin channels",
        admin_reports_title: "Admin reports",
        admin_imports_title: "Admin imports",
        admin_reports: "Reports",
        admin_import_hint: "Bulk import approved YouTube links (CSV or SQL).",
        admin_csv_label: "CSV file",
        admin_import_csv: "Import CSV",
        admin_export_sql: "Download SQL",
        admin_sql_label: "SQL import (INSERT INTO videos)",
        admin_sql_placeholder: "Paste SQL export here...",
        admin_import_sql: "Import SQL",
        admin_grant_hint: "Grant artist role to add YouTube videos.",
        studio_title: "Studio",
        studio_profile: "Creator profile",
        studio_name: "Display name",
        studio_name_placeholder: "Creator name",
        studio_slogan: "Short slogan",
        studio_slogan_placeholder: "Fun slogan",
        studio_avatar: "Profile image URL",
        studio_avatar_placeholder: "https://...",
        studio_save: "Save profile",
        studio_stats: "Your stats",
        settings_title: "Parent controls",
        settings_languages: "Languages to show",
        settings_topics: "Topics to control",
        settings_topic_allow: "Allow only selected",
        settings_topic_block: "Hide selected",
        settings_topic_search: "Find topic",
        settings_topic_placeholder: "Search topics",
        settings_channels: "Channels to control",
        settings_channel_allow: "Allow only selected",
        settings_channel_block: "Hide selected",
        settings_channel_search: "Find channel",
        settings_channel_placeholder: "Search channels",
        settings_mode_off: "Not using",
        settings_religions: "Religions to control",
        settings_religion_allow: "Allow only selected",
        settings_religion_block: "Hide selected",
        settings_watch_limit: "Daily watch limit (hours)",
        settings_password: "Confirm with your password",
        settings_save: "Save settings",
        settings_history: "Today's history",
        report_title: "Report video",
        report_reason: "Reason",
        report_placeholder: "Tell us what is wrong (min 5 characters)",
        report_send: "Send report",
        signout_title: "Confirm sign out",
        updates_title: "Updates",
        action_close: "Close",
        action_continue: "Continue",
        lang_english: "English",
        lang_russian: "Russian",
        lang_chinese: "Chinese",
        lang_turkish: "Turkish",
        lang_azerbaijani: "Azerbaijani",
        lang_arabic: "Arabic",
        control_volume_down: "Volume down",
        control_volume_up: "Volume up",
        control_report: "Report",
        control_replay: "Replay",
        control_next: "Next video",
        control_heart: "Heart",
        control_auto_next_off: "Auto next off",
        control_auto_next_on: "Auto next on",
        control_play: "Play",
        control_pause: "Pause",
        control_mute: "Mute",
        control_unmute: "Unmute",
        control_fullscreen: "Fullscreen",
        control_exit_fullscreen: "Exit fullscreen",
        control_seek_back: "Back 30 seconds",
        control_seek_forward: "Forward 30 seconds",
        control_theater: "Theater",
        control_mini: "Mini player",
        control_add_video: "Add video",
        control_admin: "Admin",
        control_studio: "Studio",
        control_settings: "Settings",
        control_updates: "Updates",
        control_sign_in: "Sign in",
        control_sign_out: "Sign out",
        control_subscribed_feed: "Subscribed feed",
        status_ready: "Ready",
        status_playing: "Playing",
        status_paused: "Paused",
        status_ended: "Ended",
        message_sign_in: "Please sign in to continue.",
        message_sign_in_first: "Sign in first.",
        message_email_verified: "Email already verified.",
        message_verification_sent: "Verification email sent.",
        message_verification_failed: "Unable to send verification email.",
        message_verification_needed: "Verify your email before watching.",
        message_verification_prompt: "Verification email sent. Please verify to continue.",
        message_email_required: "Email required.",
        message_reset_sent: "Password reset email sent.",
        message_reset_failed: "Password reset failed.",
        message_auth_failed: "Firebase auth not ready.",
        message_login_failed: "Login failed.",
        message_register_failed: "Registration failed.",
        message_password_required: "Password required.",
        message_password_check_failed: "Password check failed.",
        message_youTube_required: "YouTube URL required.",
        message_add_video_failed: "Add video failed.",
        message_loading_stats: "Loading...",
        message_no_channels: "No channels yet.",
        message_no_subscriptions: "No subscriptions yet.",
        message_channel_unavailable: "Channel unavailable.",
        message_no_channel_videos: "No videos in this channel yet.",
        message_no_videos: "No videos yet.",
        message_no_viral: "No viral videos yet.",
        message_fetch_viral_failed: "Unable to load viral videos.",
        label_creator: "Creator",
        label_minutes: "min",
        label_views: "views",
        label_hearts: "hearts",
        label_untitled: "Untitled",
        label_videos: "videos",
        label_subs: "subs",
        label_plan: "Plan:",
        label_artists: "artists",
        label_artist_stats: "Artist stats",
        label_all_videos: "All videos",
        label_your_videos: "Your videos",
        label_subscribe: "Subscribe",
        label_subscribed: "Subscribed",
        label_unsubscribe: "Unsubscribe",
        label_reported_by: "Reported by",
        label_update: "Update",
        label_read: "Read",
        label_resolved: "Resolved",
        label_auto_next: "Auto next: ",
        label_up_next: "Up next: ",
        control_dark_mode: "Dark mode",
        control_light_mode: "Light mode",
        control_party_mode: "Party mode",
        control_start: "Start video",
        control_heart_loved: "Loved",
        contact_button: "CONTACT BUTTON FOR EVERYTHING",
        contact_title: "Contact",
        contact_whatsapp: "WhatsApp: +994554195347",
        contact_instagram: "Instagram: @islammuradovtahir",
        admin_grant_artist: "Grant artist",
        admin_make_artist: "Make artist",
        admin_make_user: "Make user",
        admin_stats: "Stats",
        admin_videos_open: "Admin videos",
        admin_videos_page_title: "Admin videos",
        admin_set_free: "Set Free",
        admin_set_pro: "Set Pro",
        admin_tab_overview: "Overview",
        admin_tab_users: "Users",
        admin_tab_channels: "Channels",
        admin_tab_videos: "Videos",
        admin_tab_reports: "Reports",
        admin_tab_imports: "Imports",
        admin_users_hint: "Search users",
        admin_users_search: "Search users",
        admin_channels_hint: "Artists and channels",
        admin_channels_search: "Search channels",
        admin_videos_hint: "All videos",
        admin_videos_search: "Search videos",
        admin_view_videos: "View videos",
        admin_video_language: "Language",
        admin_report_message_placeholder: "Message to reporter (optional)",
        action_resolve: "Resolve",
        action_delete: "Delete",
        action_save: "Save",
        action_mark_read: "Mark read",
        message_auth_required: "Auth setup required.",
        message_verify_needed: "Verify your email to continue.",
        message_queue_single_auto: "Auto next is on, but the queue has one video.",
        message_queue_single: "Queue ends here. Replay when ready.",
        message_no_subscribed_videos: "No videos from your subscriptions yet.",
        message_reports_failed: "Unable to load reports.",
        message_reports_empty: "No reports yet.",
        message_select_csv: "Select a CSV file first.",
        message_import_failed: "Import failed.",
        message_imported: "Imported:",
        message_skipped: "Skipped:",
        message_paste_sql: "Paste SQL first.",
        message_export_failed: "Export failed.",
        message_profile_load_failed: "Unable to load profile.",
        message_profile_save_failed: "Unable to save profile.",
        message_profile_saved: "Profile saved.",
        message_history_unavailable: "History unavailable.",
        message_stats_unavailable: "Stats unavailable.",
        message_settings_save_failed: "Unable to save settings.",
        message_no_topics: "No topics found.",
        message_no_history: "No watches today.",
        message_report_failed: "Report failed.",
        message_no_video_selected: "No video selected.",
        message_reason_short: "Reason must be at least 5 characters.",
        message_report_thanks: "Report submitted. Thank you!",
        message_no_updates: "No updates yet.",
        status_buffering: "Buffering",
        status_error: "Playback error",
        status_limit_reached: "Limit reached",
        status_empty: "No video",
        limit_title: "Time is up for today",
        limit_copy: "Daily limit reached."
      },
      ru: {
        search_label: "Поиск",
        sidebar_toggle: "Скрыть боковую панель",
        sidebar_show: "Показать боковую панель",
        controls_hide: "Скрыть управление",
        controls_show: "Показать управление",
        tech_panel_toggle: "Панель инструментов",
        search_placeholder: "Поиск видео и каналов",
        ui_language_label: "Язык",
        sidebar_subscribed: "Подписки",
        sidebar_channels: "Каналы",
        status_loading: "Загрузка",
        player_loading: "Готовим плеер...",
        overlay_ready: "Готово к воспроизведению",
        overlay_tap_start: "Нажмите «пуск»",
        overlay_autoplay_note: "Автовоспроизведение может быть отключено. Нажмите «пуск».",
        overlay_complete: "Готово!",
        overlay_next_prompt: "Смотреть ещё?",
        overlay_next_copy: "Повторить или включить следующее.",
        video_select: "Выберите видео",
        timeline_label: "Шкала видео",
        timeline_seek: "Перемотка по шкале",
        quality_auto: "Авто",
        captions_label: "Язык субтитров",
        captions_off: "Субтитры выкл.",
        feed_recommended: "Рекомендации",
        feed_filter_hint: "Только подписки",
        feed_intro: "Свежие подборки для детей",
        feed_subscribed: "Только каналы, на которые вы подписаны",
        feed_load_hint: "Еще видео ниже",
        feed_load_more: "Загрузить ещё",
        feed_viral: "Вирусное",
        channel_title: "Канал",
        search_results: "Результаты для",
        search_title: "Результаты поиска",
        search_back: "Назад к ленте",
        search_no_results: "Ничего не найдено. Попробуйте другое слово.",
        search_fallback_recommended: "Рекомендуемое",
        search_fallback_viral: "Популярное",
        channels_open: "Все каналы",
        channels_title: "Каналы",
        channels_back: "Назад к ленте",
        channels_search_hint: "Найти канал",
        channels_search_placeholder: "Поиск каналов",
        channels_sort: "Сортировка каналов",
        channels_sort_popular: "Самые популярные",
        channels_sort_videos: "Больше видео",
        channels_sort_name: "А-Я",
        channels_filter_subscribed: "Только подписки",
        auth_welcome: "Здравствуйте, родители!",
        auth_subtitle: "Создайте безопасное пространство для ребёнка. Войдите или зарегистрируйтесь.",
        auth_email: "Эл. почта",
        auth_password: "Пароль",
        auth_sign_in: "Войти",
        auth_new_email: "Новая почта",
        auth_new_password: "Новый пароль",
        auth_create_account: "Создать аккаунт",
        auth_resend: "Повторить письмо",
        auth_forgot: "Забыли пароль",
        auth_sign_out: "Выйти",
        settings_unlock_title: "Проверка родителя",
        settings_unlock_copy: "Введите пароль, чтобы открыть родительский контроль.",
        upload_title: "Добавить видео YouTube",
        upload_url: "Ссылка YouTube",
        upload_url_placeholder: "https://www.youtube.com/watch?v=...",
        upload_languages: "Языки",
        upload_topics: "Темы (через запятую)",
        upload_topics_placeholder: "nastya, masha, minecraft",
        upload_add: "Добавить видео",
        upload_hint: "Название подставится из YouTube при наличии.",
        admin_title: "Панель администратора",
        admin_overview: "Обзор",
        admin_users: "Пользователи",
        admin_channels: "Каналы",
        admin_imports: "Импорт",
        admin_overview_title: "Обзор администратора",
        admin_users_title: "Пользователи администратора",
        admin_channels_title: "Каналы администратора",
        admin_reports_title: "Жалобы администратора",
        admin_imports_title: "Импорт администратора",
        admin_reports: "Жалобы",
        admin_import_hint: "Импорт одобренных ссылок YouTube (CSV или SQL).",
        admin_csv_label: "CSV файл",
        admin_import_csv: "Импорт CSV",
        admin_export_sql: "Скачать SQL",
        admin_sql_label: "SQL импорт (INSERT INTO videos)",
        admin_sql_placeholder: "Вставьте SQL экспорт...",
        admin_import_sql: "Импорт SQL",
        admin_grant_hint: "Дайте роль артиста для добавления видео.",
        studio_title: "Студия",
        studio_profile: "Профиль автора",
        studio_name: "Имя",
        studio_name_placeholder: "Имя автора",
        studio_slogan: "Короткий слоган",
        studio_slogan_placeholder: "Весёлый слоган",
        studio_avatar: "URL аватара",
        studio_avatar_placeholder: "https://...",
        studio_save: "Сохранить профиль",
        studio_stats: "Ваша статистика",
        settings_title: "Родительский контроль",
        settings_languages: "Показываемые языки",
        settings_topics: "Темы для контроля",
        settings_topic_allow: "Показывать только выбранные",
        settings_topic_block: "Скрыть выбранные",
        settings_topic_search: "Найти тему",
        settings_topic_placeholder: "Поиск тем",
        settings_channels: "Каналы для контроля",
        settings_channel_allow: "Показывать только выбранные",
        settings_channel_block: "Скрыть выбранные",
        settings_channel_search: "Найти канал",
        settings_channel_placeholder: "Поиск каналов",
        settings_mode_off: "Не использовать",
        settings_religions: "Религии для контроля",
        settings_religion_allow: "Показывать только выбранные",
        settings_religion_block: "Скрыть выбранные",
        settings_watch_limit: "Лимит просмотра в день (часы)",
        settings_password: "Подтвердите паролем",
        settings_save: "Сохранить",
        settings_history: "История за сегодня",
        report_title: "Пожаловаться на видео",
        report_reason: "Причина",
        report_placeholder: "Опишите проблему (мин. 5 символов)",
        report_send: "Отправить",
        signout_title: "Подтвердите выход",
        updates_title: "Обновления",
        action_close: "Закрыть",
        action_continue: "Продолжить",
        lang_english: "Английский",
        lang_russian: "Русский",
        lang_chinese: "Китайский",
        lang_turkish: "Турецкий",
        lang_azerbaijani: "Азербайджанский",
        lang_arabic: "Арабский",
        control_volume_down: "Уменьшить громкость",
        control_volume_up: "Увеличить громкость",
        control_report: "Пожаловаться",
        control_replay: "Повтор",
        control_next: "Следующее видео",
        control_heart: "Сердце",
        control_auto_next_off: "Автоследующее выкл.",
        control_auto_next_on: "Автоследующее вкл.",
        control_play: "Воспроизвести",
        control_pause: "Пауза",
        control_mute: "Выключить звук",
        control_unmute: "Включить звук",
        control_fullscreen: "Полный экран",
        control_exit_fullscreen: "Выйти из полного экрана",
        control_seek_back: "Назад на 30 секунд",
        control_seek_forward: "Вперёд на 30 секунд",
        control_theater: "Широкий режим",
        control_mini: "Мини-плеер",
        control_add_video: "Добавить видео",
        control_admin: "Админ",
        control_studio: "Студия",
        control_settings: "Настройки",
        control_updates: "Обновления",
        control_sign_in: "Войти",
        control_sign_out: "Выйти",
        control_subscribed_feed: "Лента подписок",
        status_ready: "Готово",
        status_playing: "Идёт",
        status_paused: "Пауза",
        status_ended: "Конец",
        message_sign_in: "Пожалуйста, войдите.",
        message_sign_in_first: "Сначала войдите.",
        message_email_verified: "Почта уже подтверждена.",
        message_verification_sent: "Письмо подтверждения отправлено.",
        message_verification_failed: "Не удалось отправить письмо подтверждения.",
        message_verification_needed: "Подтвердите почту перед просмотром.",
        message_verification_prompt: "Письмо подтверждения отправлено. Подтвердите, чтобы продолжить.",
        message_email_required: "Нужен email.",
        message_reset_sent: "Письмо для сброса отправлено.",
        message_reset_failed: "Сброс пароля не удался.",
        message_auth_failed: "Firebase auth не готов.",
        message_login_failed: "Ошибка входа.",
        message_register_failed: "Ошибка регистрации.",
        message_password_required: "Нужен пароль.",
        message_password_check_failed: "Проверка пароля не удалась.",
        message_youTube_required: "Нужна ссылка YouTube.",
        message_add_video_failed: "Не удалось добавить видео.",
        message_loading_stats: "Загрузка...",
        message_no_channels: "Каналов пока нет.",
        message_no_subscriptions: "Подписок пока нет.",
        message_channel_unavailable: "Канал недоступен.",
        message_no_channel_videos: "В этом канале пока нет видео.",
        message_no_videos: "Видео пока нет.",
        message_no_viral: "Вирусных видео пока нет.",
        message_fetch_viral_failed: "Не удалось загрузить вирусные видео.",
        label_creator: "Автор",
        label_minutes: "мин",
        label_views: "просмотров",
        label_hearts: "сердец",
        label_untitled: "Без названия",
        label_videos: "видео",
        label_subs: "подписчики",
        label_plan: "Тариф:",
        label_artists: "авторов",
        label_artist_stats: "Статистика авторов",
        label_all_videos: "Все видео",
        label_your_videos: "Ваши видео",
        label_subscribe: "Подписаться",
        label_subscribed: "Подписан",
        label_unsubscribe: "Отписаться",
        label_reported_by: "Жалоба от",
        label_update: "Обновление",
        label_read: "Прочитано",
        label_resolved: "Решено",
        label_auto_next: "Авто далее: ",
        label_up_next: "Далее: ",
        control_dark_mode: "Тёмный режим",
        control_light_mode: "Светлый режим",
        control_party_mode: "Праздничный режим",
        control_start: "Начать видео",
        control_heart_loved: "Люблю",
        contact_button: "КНОПКА СВЯЗИ ПО ЛЮБЫМ ВОПРОСАМ",
        contact_title: "Связаться",
        contact_whatsapp: "WhatsApp: +994554195347",
        contact_instagram: "Instagram: @islammuradovtahir",
        admin_grant_artist: "Дать роль автора",
        admin_make_artist: "Сделать автором",
        admin_make_user: "Сделать пользователем",
        admin_stats: "Статистика",
        admin_videos_open: "Видео админа",
        admin_videos_page_title: "Видео админа",
        admin_set_free: "Сделать Free",
        admin_set_pro: "Сделать Pro",
        admin_tab_overview: "Обзор",
        admin_tab_users: "Пользователи",
        admin_tab_channels: "Каналы",
        admin_tab_videos: "Видео",
        admin_tab_reports: "Жалобы",
        admin_tab_imports: "Импорт",
        admin_users_hint: "Поиск пользователей",
        admin_users_search: "Поиск пользователей",
        admin_channels_hint: "Авторы и каналы",
        admin_channels_search: "Поиск каналов",
        admin_videos_hint: "Все видео",
        admin_videos_search: "Поиск видео",
        admin_view_videos: "Видео канала",
        admin_video_language: "Язык",
        admin_report_message_placeholder: "Сообщение автору жалобы (необязательно)",
        action_resolve: "Решено",
        action_delete: "Удалить",
        action_save: "Сохранить",
        action_mark_read: "Отметить как прочитанное",
        message_auth_required: "Требуется настройка авторизации.",
        message_verify_needed: "Подтвердите почту для продолжения.",
        message_queue_single_auto: "Авто далее включено, но в очереди одно видео.",
        message_queue_single: "Очередь закончилась. Повторите при готовности.",
        message_no_subscribed_videos: "В подписках пока нет видео.",
        message_reports_failed: "Не удалось загрузить жалобы.",
        message_reports_empty: "Жалоб пока нет.",
        message_select_csv: "Сначала выберите CSV файл.",
        message_import_failed: "Импорт не удался.",
        message_imported: "Импортировано:",
        message_skipped: "Пропущено:",
        message_paste_sql: "Сначала вставьте SQL.",
        message_export_failed: "Экспорт не удался.",
        message_profile_load_failed: "Не удалось загрузить профиль.",
        message_profile_save_failed: "Не удалось сохранить профиль.",
        message_profile_saved: "Профиль сохранён.",
        message_history_unavailable: "История недоступна.",
        message_stats_unavailable: "Статистика недоступна.",
        message_settings_save_failed: "Не удалось сохранить настройки.",
        message_no_topics: "Темы не найдены.",
        message_no_history: "Сегодня просмотров нет.",
        message_report_failed: "Жалоба не отправлена.",
        message_no_video_selected: "Видео не выбрано.",
        message_reason_short: "Причина должна быть не короче 5 символов.",
        message_report_thanks: "Жалоба отправлена. Спасибо!",
        message_no_updates: "Обновлений нет.",
        status_buffering: "Буферизация",
        status_error: "Ошибка воспроизведения",
        status_limit_reached: "Лимит достигнут",
        status_empty: "Нет видео",
        limit_title: "Сегодня лимит исчерпан",
        limit_copy: "Дневной лимит достигнут."
      },
      zh: {
        search_label: "搜索",
        sidebar_toggle: "切换侧边栏",
        sidebar_show: "显示侧边栏",
        controls_hide: "隐藏控制栏",
        controls_show: "显示控制栏",
        tech_panel_toggle: "切换播放器工具",
        search_placeholder: "搜索视频和频道",
        ui_language_label: "语言",
        sidebar_subscribed: "已订阅",
        sidebar_channels: "频道",
        status_loading: "加载中",
        player_loading: "正在准备播放器...",
        overlay_ready: "准备播放",
        overlay_tap_start: "点击播放开始",
        overlay_autoplay_note: "自动播放可能被阻止，请点击播放。",
        overlay_complete: "播放结束！",
        overlay_next_prompt: "要再看一个吗？",
        overlay_next_copy: "重播或播放下一个。",
        video_select: "请选择一个视频",
        timeline_label: "视频时间轴",
        timeline_seek: "拖动时间轴",
        quality_auto: "自动",
        captions_label: "字幕语言",
        captions_off: "关闭字幕",
        feed_recommended: "推荐",
        feed_filter_hint: "仅订阅",
        feed_intro: "为孩子准备的新内容",
        feed_subscribed: "只看已关注的频道",
        feed_load_hint: "更多视频在下方",
        feed_load_more: "加载更多",
        feed_viral: "热门",
        channel_title: "频道",
        search_results: "搜索结果：",
        search_title: "搜索结果",
        search_back: "返回首页",
        search_no_results: "没有找到结果，请换个词试试。",
        search_fallback_recommended: "推荐",
        search_fallback_viral: "热门",
        channels_open: "全部频道",
        channels_title: "频道",
        channels_back: "返回首页",
        channels_search_hint: "查找频道",
        channels_search_placeholder: "搜索频道",
        channels_sort: "排序频道",
        channels_sort_popular: "最受欢迎",
        channels_sort_videos: "最多视频",
        channels_sort_name: "按名称",
        channels_filter_subscribed: "仅订阅",
        auth_welcome: "家长您好！",
        auth_subtitle: "为孩子创建安全的空间。登录或注册开始使用。",
        auth_email: "邮箱",
        auth_password: "密码",
        auth_sign_in: "登录",
        auth_new_email: "新邮箱",
        auth_new_password: "新密码",
        auth_create_account: "创建账号",
        auth_resend: "重新发送验证邮件",
        auth_forgot: "忘记密码",
        auth_sign_out: "退出登录",
        settings_unlock_title: "家长确认",
        settings_unlock_copy: "输入密码以打开家长控制。",
        upload_title: "添加 YouTube 视频",
        upload_url: "YouTube 链接",
        upload_url_placeholder: "https://www.youtube.com/watch?v=...",
        upload_languages: "语言",
        upload_topics: "主题（用逗号分隔）",
        upload_topics_placeholder: "nastya, masha, minecraft",
        upload_add: "添加视频",
        upload_hint: "如可用，标题将自动从 YouTube 获取。",
        admin_title: "管理员控制台",
        admin_overview: "管理员概览",
        admin_users: "管理员用户",
        admin_channels: "管理员频道",
        admin_imports: "管理员导入",
        admin_overview_title: "管理员概览",
        admin_users_title: "管理员用户",
        admin_channels_title: "管理员频道",
        admin_reports_title: "管理员举报",
        admin_imports_title: "管理员导入",
        admin_reports: "举报",
        admin_import_hint: "批量导入已批准的 YouTube 链接（CSV 或 SQL）。",
        admin_csv_label: "CSV 文件",
        admin_import_csv: "导入 CSV",
        admin_export_sql: "下载 SQL",
        admin_sql_label: "SQL 导入（INSERT INTO videos）",
        admin_sql_placeholder: "粘贴 SQL 导出内容...",
        admin_import_sql: "导入 SQL",
        admin_grant_hint: "授予作者角色以添加视频。",
        studio_title: "工作室",
        studio_profile: "创作者资料",
        studio_name: "显示名称",
        studio_name_placeholder: "创作者名称",
        studio_slogan: "简短标语",
        studio_slogan_placeholder: "有趣的标语",
        studio_avatar: "头像链接",
        studio_avatar_placeholder: "https://...",
        studio_save: "保存资料",
        studio_stats: "你的数据",
        settings_title: "家长控制",
        settings_languages: "显示语言",
        settings_topics: "主题控制",
        settings_topic_allow: "仅显示所选",
        settings_topic_block: "隐藏所选",
        settings_topic_search: "查找主题",
        settings_topic_placeholder: "搜索主题",
        settings_channels: "频道控制",
        settings_channel_allow: "仅显示所选",
        settings_channel_block: "隐藏所选",
        settings_channel_search: "查找频道",
        settings_channel_placeholder: "搜索频道",
        settings_mode_off: "不使用",
        settings_religions: "宗教筛选",
        settings_religion_allow: "仅允许所选",
        settings_religion_block: "隐藏所选",
        settings_watch_limit: "每日观看时长（小时）",
        settings_password: "用密码确认",
        settings_save: "保存设置",
        settings_history: "今日观看记录",
        report_title: "举报视频",
        report_reason: "原因",
        report_placeholder: "说明问题（至少 5 个字符）",
        report_send: "发送举报",
        signout_title: "确认退出",
        updates_title: "通知",
        action_close: "关闭",
        action_continue: "继续",
        lang_english: "英语",
        lang_russian: "俄语",
        lang_chinese: "中文",
        lang_turkish: "土耳其语",
        lang_azerbaijani: "阿塞拜疆语",
        lang_arabic: "阿拉伯语",
        control_volume_down: "降低音量",
        control_volume_up: "提高音量",
        control_report: "举报",
        control_replay: "重播",
        control_next: "下一个视频",
        control_heart: "喜欢",
        control_auto_next_off: "自动下一个：关",
        control_auto_next_on: "自动下一个：开",
        control_play: "播放",
        control_pause: "暂停",
        control_mute: "静音",
        control_unmute: "取消静音",
        control_fullscreen: "全屏",
        control_exit_fullscreen: "退出全屏",
        control_seek_back: "后退 30 秒",
        control_seek_forward: "前进 30 秒",
        control_theater: "影院模式",
        control_mini: "迷你播放器",
        control_add_video: "添加视频",
        control_admin: "管理员",
        control_studio: "工作室",
        control_settings: "设置",
        control_updates: "通知",
        control_sign_in: "登录",
        control_sign_out: "退出登录",
        control_subscribed_feed: "订阅内容",
        status_ready: "就绪",
        status_playing: "播放中",
        status_paused: "已暂停",
        status_ended: "已结束",
        message_sign_in: "请先登录。",
        message_sign_in_first: "请先登录。",
        message_email_verified: "邮箱已验证。",
        message_verification_sent: "验证邮件已发送。",
        message_verification_failed: "发送验证邮件失败。",
        message_verification_needed: "请先验证邮箱。",
        message_verification_prompt: "验证邮件已发送，请验证后继续。",
        message_email_required: "需要邮箱。",
        message_reset_sent: "密码重置邮件已发送。",
        message_reset_failed: "密码重置失败。",
        message_auth_failed: "Firebase 授权未就绪。",
        message_login_failed: "登录失败。",
        message_register_failed: "注册失败。",
        message_password_required: "需要密码。",
        message_password_check_failed: "密码验证失败。",
        message_youTube_required: "需要 YouTube 链接。",
        message_add_video_failed: "添加视频失败。",
        message_loading_stats: "加载中...",
        message_no_channels: "暂无频道。",
        message_no_subscriptions: "暂无订阅。",
        message_channel_unavailable: "频道不可用。",
        message_no_channel_videos: "该频道暂无视频。",
        message_no_videos: "暂无视频。",
        message_no_viral: "暂无热门视频。",
        message_fetch_viral_failed: "热门视频加载失败。",
        label_creator: "创作者",
        label_minutes: "分钟",
        label_views: "次观看",
        label_hearts: "喜欢",
        label_untitled: "未命名",
        label_videos: "视频",
        label_subs: "订阅",
        label_plan: "套餐：",
        label_artists: "创作者",
        label_artist_stats: "创作者统计",
        label_all_videos: "全部视频",
        label_your_videos: "你的视频",
        label_subscribe: "订阅",
        label_subscribed: "已订阅",
        label_unsubscribe: "取消订阅",
        label_reported_by: "举报者",
        label_update: "更新",
        label_read: "已读",
        label_resolved: "已处理",
        label_auto_next: "自动下一个：",
        label_up_next: "接下来：",
        control_dark_mode: "深色模式",
        control_light_mode: "浅色模式",
        control_party_mode: "缤纷模式",
        control_start: "开始播放",
        control_heart_loved: "已喜欢",
        contact_button: "联系按钮（任何问题）",
        contact_title: "联系",
        contact_whatsapp: "WhatsApp: +994554195347",
        contact_instagram: "Instagram: @islammuradovtahir",
        admin_grant_artist: "授予作者权限",
        admin_make_artist: "设为作者",
        admin_make_user: "设为用户",
        admin_stats: "统计",
        admin_videos_open: "管理视频",
        admin_videos_page_title: "管理视频",
        admin_set_free: "设为免费",
        admin_set_pro: "设为专业",
        admin_tab_overview: "概览",
        admin_tab_users: "用户",
        admin_tab_channels: "频道",
        admin_tab_videos: "视频",
        admin_tab_reports: "举报",
        admin_tab_imports: "导入",
        admin_users_hint: "搜索用户",
        admin_users_search: "搜索用户",
        admin_channels_hint: "作者与频道",
        admin_channels_search: "搜索频道",
        admin_videos_hint: "全部视频",
        admin_videos_search: "搜索视频",
        admin_view_videos: "查看视频",
        admin_video_language: "语言",
        admin_report_message_placeholder: "给举报者的消息（可选）",
        action_resolve: "处理",
        action_delete: "删除",
        action_save: "保存",
        action_mark_read: "标记已读",
        message_auth_required: "需要完成认证设置。",
        message_verify_needed: "请先验证邮箱。",
        message_queue_single_auto: "自动下一个已开启，但队列只有一个视频。",
        message_queue_single: "队列结束，可重播。",
        message_no_subscribed_videos: "订阅中暂无视频。",
        message_reports_failed: "无法加载举报。",
        message_reports_empty: "暂无举报。",
        message_select_csv: "请先选择 CSV 文件。",
        message_import_failed: "导入失败。",
        message_imported: "已导入：",
        message_skipped: "已跳过：",
        message_paste_sql: "请先粘贴 SQL。",
        message_export_failed: "导出失败。",
        message_profile_load_failed: "无法加载资料。",
        message_profile_save_failed: "无法保存资料。",
        message_profile_saved: "资料已保存。",
        message_history_unavailable: "历史不可用。",
        message_stats_unavailable: "统计不可用。",
        message_settings_save_failed: "无法保存设置。",
        message_no_topics: "未找到主题。",
        message_no_history: "今天没有观看记录。",
        message_report_failed: "举报失败。",
        message_no_video_selected: "未选择视频。",
        message_reason_short: "原因至少 5 个字符。",
        message_report_thanks: "举报已提交，谢谢！",
        message_no_updates: "暂无更新。",
        status_buffering: "缓冲中",
        status_error: "播放错误",
        status_limit_reached: "已达上限",
        status_empty: "暂无视频",
        limit_title: "今天观看时间已用完",
        limit_copy: "已达到每日限制。"
      },
      tr: {
        search_label: "Ara",
        sidebar_toggle: "Kenar çubuğunu değiştir",
        sidebar_show: "Kenar çubuğunu göster",
        controls_hide: "Kontrolleri gizle",
        controls_show: "Kontrolleri göster",
        tech_panel_toggle: "Oynatıcı araçları",
        search_placeholder: "Videoları ve kanalları ara",
        ui_language_label: "Dil",
        sidebar_subscribed: "Abonelikler",
        sidebar_channels: "Kanallar",
        status_loading: "Yükleniyor",
        player_loading: "Oynatıcı hazırlanıyor...",
        overlay_ready: "Oynatmaya hazır",
        overlay_tap_start: "Başlatmak için dokunun",
        overlay_autoplay_note: "Otomatik oynatma engellenebilir. Dokunarak başlatın.",
        overlay_complete: "Bitti!",
        overlay_next_prompt: "Bir tane daha izleyelim mi?",
        overlay_next_copy: "Tekrar oynat veya sonraki videoyu aç.",
        video_select: "Bir video seçin",
        timeline_label: "Video zaman çizgisi",
        timeline_seek: "Zaman çizgisinde gez",
        quality_auto: "Otomatik",
        captions_label: "Altyazı dili",
        captions_off: "Altyazı kapalı",
        feed_recommended: "Önerilen",
        feed_filter_hint: "Sadece abonelikler",
        feed_intro: "Çocuklar için taze seçimler",
        feed_subscribed: "Yalnızca takip edilen kanallar",
        feed_load_hint: "Daha fazla video aşağıda",
        feed_load_more: "Daha fazla",
        feed_viral: "Viral",
        channel_title: "Kanal",
        search_results: "Arama sonuçları:",
        search_title: "Arama sonuçları",
        search_back: "Akışa dön",
        search_no_results: "Sonuç bulunamadı. Başka bir kelime deneyin.",
        search_fallback_recommended: "Önerilen",
        search_fallback_viral: "Popüler",
        channels_open: "Tüm kanallar",
        channels_title: "Kanallar",
        channels_back: "Akışa dön",
        channels_search_hint: "Kanal bul",
        channels_search_placeholder: "Kanal ara",
        channels_sort: "Kanalları sırala",
        channels_sort_popular: "En popüler",
        channels_sort_videos: "En çok video",
        channels_sort_name: "A-Z",
        channels_filter_subscribed: "Sadece abonelikler",
        auth_welcome: "Ebeveynler, hoş geldiniz!",
        auth_subtitle: "Çocuklar için güvenli bir alan oluşturun. Giriş yapın ya da hesap açın.",
        auth_email: "E-posta",
        auth_password: "Şifre",
        auth_sign_in: "Giriş yap",
        auth_new_email: "Yeni e-posta",
        auth_new_password: "Yeni şifre",
        auth_create_account: "Hesap oluştur",
        auth_resend: "Doğrulama e-postasını tekrar gönder",
        auth_forgot: "Şifremi unuttum",
        auth_sign_out: "Çıkış yap",
        settings_unlock_title: "Ebeveyn doğrulaması",
        settings_unlock_copy: "Ebeveyn kontrollerini açmak için şifre girin.",
        upload_title: "YouTube videosu ekle",
        upload_url: "YouTube URL",
        upload_url_placeholder: "https://www.youtube.com/watch?v=...",
        upload_languages: "Diller",
        upload_topics: "Konular (virgülle)",
        upload_topics_placeholder: "nastya, masha, minecraft",
        upload_add: "Video ekle",
        upload_hint: "Mümkünse başlık YouTube'dan alınır.",
        admin_title: "Yönetici paneli",
        admin_overview: "Yönetici özet",
        admin_users: "Yönetici kullanıcılar",
        admin_channels: "Yönetici kanallar",
        admin_imports: "Yönetici içe aktarma",
        admin_overview_title: "Yönetici özet",
        admin_users_title: "Yönetici kullanıcılar",
        admin_channels_title: "Yönetici kanallar",
        admin_reports_title: "Yönetici raporları",
        admin_imports_title: "Yönetici içe aktarma",
        admin_reports: "Raporlar",
        admin_import_hint: "Onaylı YouTube linklerini toplu içe aktar (CSV veya SQL).",
        admin_csv_label: "CSV dosyası",
        admin_import_csv: "CSV içe aktar",
        admin_export_sql: "SQL indir",
        admin_sql_label: "SQL içe aktarım (INSERT INTO videos)",
        admin_sql_placeholder: "SQL çıktısını buraya yapıştır...",
        admin_import_sql: "SQL içe aktar",
        admin_grant_hint: "Video eklemek için sanatçı rolü verin.",
        studio_title: "Stüdyo",
        studio_profile: "Üretici profili",
        studio_name: "Görünen ad",
        studio_name_placeholder: "Üretici adı",
        studio_slogan: "Kısa slogan",
        studio_slogan_placeholder: "Eğlenceli slogan",
        studio_avatar: "Profil görseli URL",
        studio_avatar_placeholder: "https://...",
        studio_save: "Profili kaydet",
        studio_stats: "İstatistiklerin",
        settings_title: "Ebeveyn kontrolleri",
        settings_languages: "Gösterilecek diller",
        settings_topics: "Kontrol edilecek konular",
        settings_topic_allow: "Yalnızca seçilenleri göster",
        settings_topic_block: "Seçilenleri gizle",
        settings_topic_search: "Konu ara",
        settings_topic_placeholder: "Konuları ara",
        settings_channels: "Kontrol edilecek kanallar",
        settings_channel_allow: "Yalnızca seçilenleri göster",
        settings_channel_block: "Seçilenleri gizle",
        settings_channel_search: "Kanal ara",
        settings_channel_placeholder: "Kanalları ara",
        settings_mode_off: "Kullanmıyorum",
        settings_religions: "Kontrol edilecek inançlar",
        settings_religion_allow: "Yalnızca seçilenleri göster",
        settings_religion_block: "Seçilenleri gizle",
        settings_watch_limit: "Günlük izleme limiti (saat)",
        settings_password: "Şifre ile onayla",
        settings_save: "Ayarları kaydet",
        settings_history: "Bugünün geçmişi",
        report_title: "Videoyu bildir",
        report_reason: "Sebep",
        report_placeholder: "Sorunu yazın (en az 5 karakter)",
        report_send: "Bildirimi gönder",
        signout_title: "Çıkışı onayla",
        updates_title: "Güncellemeler",
        action_close: "Kapat",
        action_continue: "Devam",
        lang_english: "İngilizce",
        lang_russian: "Rusça",
        lang_chinese: "Çince",
        lang_turkish: "Türkçe",
        lang_azerbaijani: "Azerice",
        lang_arabic: "Arapça",
        control_volume_down: "Sesi azalt",
        control_volume_up: "Sesi artır",
        control_report: "Bildir",
        control_replay: "Tekrar",
        control_next: "Sonraki video",
        control_heart: "Kalp",
        control_auto_next_off: "Oto sonraki kapalı",
        control_auto_next_on: "Oto sonraki açık",
        control_play: "Oynat",
        control_pause: "Duraklat",
        control_mute: "Sessize al",
        control_unmute: "Sesi aç",
        control_fullscreen: "Tam ekran",
        control_exit_fullscreen: "Tam ekrandan çık",
        control_seek_back: "30 sn geri",
        control_seek_forward: "30 sn ileri",
        control_theater: "Tiyatro",
        control_mini: "Mini oynatıcı",
        control_add_video: "Video ekle",
        control_admin: "Yönetici",
        control_studio: "Stüdyo",
        control_settings: "Ayarlar",
        control_updates: "Güncellemeler",
        control_sign_in: "Giriş yap",
        control_sign_out: "Çıkış yap",
        control_subscribed_feed: "Abone akışı",
        status_ready: "Hazır",
        status_playing: "Oynatılıyor",
        status_paused: "Duraklatıldı",
        status_ended: "Bitti",
        message_sign_in: "Lütfen giriş yapın.",
        message_sign_in_first: "Önce giriş yapın.",
        message_email_verified: "E-posta doğrulandı.",
        message_verification_sent: "Doğrulama e-postası gönderildi.",
        message_verification_failed: "Doğrulama e-postası gönderilemedi.",
        message_verification_needed: "İzlemek için e-postayı doğrulayın.",
        message_verification_prompt: "Doğrulama e-postası gönderildi. Devam etmek için doğrulayın.",
        message_email_required: "E-posta gerekli.",
        message_reset_sent: "Şifre sıfırlama e-postası gönderildi.",
        message_reset_failed: "Şifre sıfırlama başarısız.",
        message_auth_failed: "Firebase auth hazır değil.",
        message_login_failed: "Giriş başarısız.",
        message_register_failed: "Kayıt başarısız.",
        message_password_required: "Şifre gerekli.",
        message_password_check_failed: "Şifre kontrolü başarısız.",
        message_youTube_required: "YouTube URL gerekli.",
        message_add_video_failed: "Video eklenemedi.",
        message_loading_stats: "Yükleniyor...",
        message_no_channels: "Henüz kanal yok.",
        message_no_subscriptions: "Henüz abonelik yok.",
        message_channel_unavailable: "Kanal kullanılamıyor.",
        message_no_channel_videos: "Bu kanalda video yok.",
        message_no_videos: "Henüz video yok.",
        message_no_viral: "Henüz viral video yok.",
        message_fetch_viral_failed: "Viral videolar yüklenemedi.",
        label_creator: "Yayıncı",
        label_minutes: "dk",
        label_views: "izlenme",
        label_hearts: "kalp",
        label_untitled: "Başlıksız",
        label_videos: "video",
        label_subs: "abone",
        label_plan: "Plan:",
        label_artists: "sanatçı",
        label_artist_stats: "Sanatçı istatistikleri",
        label_all_videos: "Tüm videolar",
        label_your_videos: "Videoların",
        label_subscribe: "Abone ol",
        label_subscribed: "Abone",
        label_unsubscribe: "Abonelikten çık",
        label_reported_by: "Bildiren",
        label_update: "Güncelleme",
        label_read: "Okundu",
        label_resolved: "Çözüldü",
        label_auto_next: "Oto sonraki: ",
        label_up_next: "Sıradaki: ",
        control_dark_mode: "Koyu mod",
        control_light_mode: "Açık mod",
        control_party_mode: "Eğlenceli mod",
        control_start: "Videoyu başlat",
        control_heart_loved: "Sevildi",
        contact_button: "HER ŞEY İÇİN İLETİŞİM DÜĞMESİ",
        contact_title: "İletişim",
        contact_whatsapp: "WhatsApp: +994554195347",
        contact_instagram: "Instagram: @islammuradovtahir",
        admin_grant_artist: "Sanatçı rolü ver",
        admin_make_artist: "Sanatçı yap",
        admin_make_user: "Kullanıcı yap",
        admin_stats: "İstatistikler",
        admin_videos_open: "Video yönetimi",
        admin_videos_page_title: "Video yönetimi",
        admin_set_free: "Ücretsiz yap",
        admin_set_pro: "Pro yap",
        admin_tab_overview: "Genel",
        admin_tab_users: "Kullanıcılar",
        admin_tab_channels: "Kanallar",
        admin_tab_videos: "Videolar",
        admin_tab_reports: "Raporlar",
        admin_tab_imports: "İçe aktarma",
        admin_users_hint: "Kullanıcı ara",
        admin_users_search: "Kullanıcı ara",
        admin_channels_hint: "Sanatçılar ve kanallar",
        admin_channels_search: "Kanal ara",
        admin_videos_hint: "Tüm videolar",
        admin_videos_search: "Video ara",
        admin_view_videos: "Videoları gör",
        admin_video_language: "Dil",
        admin_report_message_placeholder: "Bildiren kişiye mesaj (isteğe bağlı)",
        action_resolve: "Çöz",
        action_delete: "Sil",
        action_save: "Kaydet",
        action_mark_read: "Okundu işaretle",
        message_auth_required: "Kimlik doğrulama kurulumu gerekli.",
        message_verify_needed: "Devam etmek için e-postayı doğrulayın.",
        message_queue_single_auto: "Oto sonraki açık, ama sırada tek video var.",
        message_queue_single: "Sıra bitti. Hazır olduğunda tekrar oynat.",
        message_no_subscribed_videos: "Aboneliklerinde henüz video yok.",
        message_reports_failed: "Raporlar yüklenemedi.",
        message_reports_empty: "Henüz rapor yok.",
        message_select_csv: "Önce bir CSV dosyası seçin.",
        message_import_failed: "İçe aktarma başarısız.",
        message_imported: "İçe aktarılan:",
        message_skipped: "Atlanan:",
        message_paste_sql: "Önce SQL yapıştırın.",
        message_export_failed: "Dışa aktarma başarısız.",
        message_profile_load_failed: "Profil yüklenemedi.",
        message_profile_save_failed: "Profil kaydedilemedi.",
        message_profile_saved: "Profil kaydedildi.",
        message_history_unavailable: "Geçmiş kullanılamıyor.",
        message_stats_unavailable: "İstatistikler kullanılamıyor.",
        message_settings_save_failed: "Ayarlar kaydedilemedi.",
        message_no_topics: "Konu bulunamadı.",
        message_no_history: "Bugün izleme yok.",
        message_report_failed: "Rapor gönderilemedi.",
        message_no_video_selected: "Video seçilmedi.",
        message_reason_short: "Neden en az 5 karakter olmalı.",
        message_report_thanks: "Rapor gönderildi. Teşekkürler!",
        message_no_updates: "Henüz güncelleme yok.",
        status_buffering: "Arabellekte",
        status_error: "Oynatma hatası",
        status_limit_reached: "Limit aşıldı",
        status_empty: "Video yok",
        limit_title: "Bugünlük süre doldu",
        limit_copy: "Günlük limit aşıldı."
      },
      az: {
        search_label: "Axtar",
        sidebar_toggle: "Yan paneli dəyiş",
        sidebar_show: "Yan paneli göstər",
        controls_hide: "İdarələri gizlət",
        controls_show: "İdarələri göstər",
        tech_panel_toggle: "Pleyer alətləri",
        search_placeholder: "Video və kanalları axtarın",
        ui_language_label: "Dil",
        sidebar_subscribed: "Abunələr",
        sidebar_channels: "Kanallar",
        status_loading: "Yüklənir",
        player_loading: "Pleyer hazırlanır...",
        overlay_ready: "Oynatma hazırdır",
        overlay_tap_start: "Başlamaq üçün toxunun",
        overlay_autoplay_note: "Avtomatik oynatma bloklana bilər. Toxunaraq başladın.",
        overlay_complete: "Bitdi!",
        overlay_next_prompt: "Birini də izləyək?",
        overlay_next_copy: "Təkrar et və ya növbəti videonu aç.",
        video_select: "Video seçin",
        timeline_label: "Video zaman xətti",
        timeline_seek: "Zaman xəttində irəli-geri",
        quality_auto: "Avto",
        captions_label: "Altyazı dili",
        captions_off: "Altyazı söndür",
        feed_recommended: "Tövsiyə olunan",
        feed_filter_hint: "Yalnız abunələr",
        feed_intro: "Uşaqlar üçün yeni seçimlər",
        feed_subscribed: "Yalnız izlənən kanallar",
        feed_load_hint: "Daha çox video aşağıda",
        feed_load_more: "Daha çox",
        feed_viral: "Viral",
        channel_title: "Kanal",
        search_results: "Axtarış nəticələri:",
        search_title: "Axtarış nəticələri",
        search_back: "Lentə qayıt",
        search_no_results: "Nəticə tapılmadı. Başqa söz yoxlayın.",
        search_fallback_recommended: "Tövsiyə olunan",
        search_fallback_viral: "Viral",
        channels_open: "Bütün kanallar",
        channels_title: "Kanallar",
        channels_back: "Lentə qayıt",
        channels_search_hint: "Kanal tap",
        channels_search_placeholder: "Kanal axtar",
        channels_sort: "Kanalları sırala",
        channels_sort_popular: "Ən populyar",
        channels_sort_videos: "Ən çox video",
        channels_sort_name: "A-Z",
        channels_filter_subscribed: "Yalnız abunələr",
        auth_welcome: "Valideynlər, xoş gəldiniz!",
        auth_subtitle: "Uşaqlar üçün təhlükəsiz məkan yaradın. Daxil olun və ya hesab yaradın.",
        auth_email: "Email",
        auth_password: "Şifrə",
        auth_sign_in: "Daxil ol",
        auth_new_email: "Yeni email",
        auth_new_password: "Yeni şifrə",
        auth_create_account: "Hesab yarat",
        auth_resend: "Təsdiq emailini yenidən göndər",
        auth_forgot: "Şifrəni unutdum",
        auth_sign_out: "Çıxış",
        settings_unlock_title: "Valideyn təsdiqi",
        settings_unlock_copy: "Valideyn nəzarətini açmaq üçün şifrəni daxil edin.",
        upload_title: "YouTube videosu əlavə et",
        upload_url: "YouTube URL",
        upload_url_placeholder: "https://www.youtube.com/watch?v=...",
        upload_languages: "Dillər",
        upload_topics: "Mövzular (vergüllə)",
        upload_topics_placeholder: "nastya, masha, minecraft",
        upload_add: "Video əlavə et",
        upload_hint: "Mümkünsə başlıq YouTube-dan alınır.",
        admin_title: "Admin idarəetmə",
        admin_overview: "Admin ümumi baxış",
        admin_users: "Admin istifadəçilər",
        admin_channels: "Admin kanallar",
        admin_imports: "Admin idxal",
        admin_overview_title: "Admin ümumi baxış",
        admin_users_title: "Admin istifadəçilər",
        admin_channels_title: "Admin kanallar",
        admin_reports_title: "Admin şikayətləri",
        admin_imports_title: "Admin idxal",
        admin_reports: "Şikayətlər",
        admin_import_hint: "Təsdiqlənmiş YouTube linklərini toplu idxal et (CSV və ya SQL).",
        admin_csv_label: "CSV faylı",
        admin_import_csv: "CSV idxal et",
        admin_export_sql: "SQL yüklə",
        admin_sql_label: "SQL idxalı (INSERT INTO videos)",
        admin_sql_placeholder: "SQL ixracını bura yapışdırın...",
        admin_import_sql: "SQL idxal et",
        admin_grant_hint: "Video əlavə etmək üçün artist rolunu verin.",
        studio_title: "Studiya",
        studio_profile: "Yaradıcı profili",
        studio_name: "Görünən ad",
        studio_name_placeholder: "Yaradıcı adı",
        studio_slogan: "Qısa sloqan",
        studio_slogan_placeholder: "Əyləncəli sloqan",
        studio_avatar: "Profil şəkli URL",
        studio_avatar_placeholder: "https://...",
        studio_save: "Profili yadda saxla",
        studio_stats: "Statistikanız",
        settings_title: "Valideyn nəzarəti",
        settings_languages: "Göstəriləcək dillər",
        settings_topics: "İdarə olunacaq mövzular",
        settings_topic_allow: "Yalnız seçilənləri göstər",
        settings_topic_block: "Seçilənləri gizlət",
        settings_topic_search: "Mövzu axtar",
        settings_topic_placeholder: "Mövzuları axtar",
        settings_channels: "İdarə olunacaq kanallar",
        settings_channel_allow: "Yalnız seçilənləri göstər",
        settings_channel_block: "Seçilənləri gizlət",
        settings_channel_search: "Kanal tap",
        settings_channel_placeholder: "Kanalları axtar",
        settings_mode_off: "İstifadə edilmir",
        settings_religions: "İdarə olunacaq inanc",
        settings_religion_allow: "Yalnız seçilənləri göstər",
        settings_religion_block: "Seçilənləri gizlət",
        settings_watch_limit: "Gündəlik izləmə limiti (saat)",
        settings_password: "Şifrə ilə təsdiqlə",
        settings_save: "Ayarları yadda saxla",
        settings_history: "Bugünkü tarixçə",
        report_title: "Videonu şikayət et",
        report_reason: "Səbəb",
        report_placeholder: "Problemi yazın (min 5 simvol)",
        report_send: "Şikayəti göndər",
        signout_title: "Çıxışı təsdiqlə",
        updates_title: "Yeniliklər",
        action_close: "Bağla",
        action_continue: "Davam et",
        lang_english: "İngilis",
        lang_russian: "Rus",
        lang_chinese: "Çin",
        lang_turkish: "Türk",
        lang_azerbaijani: "Azərbaycan",
        lang_arabic: "Ərəb",
        control_volume_down: "Səsi azalt",
        control_volume_up: "Səsi artır",
        control_report: "Şikayət",
        control_replay: "Təkrar",
        control_next: "Növbəti video",
        control_heart: "Ürək",
        control_auto_next_off: "Avto növbəti sönük",
        control_auto_next_on: "Avto növbəti aktiv",
        control_play: "Oynat",
        control_pause: "Dayan",
        control_mute: "Səsi bağla",
        control_unmute: "Səsi aç",
        control_fullscreen: "Tam ekran",
        control_exit_fullscreen: "Tam ekrandan çıx",
        control_seek_back: "30 san geri",
        control_seek_forward: "30 san irəli",
        control_theater: "Teatr",
        control_mini: "Mini pleyer",
        control_add_video: "Video əlavə et",
        control_admin: "Admin",
        control_studio: "Studiya",
        control_settings: "Ayarlar",
        control_updates: "Yeniliklər",
        control_sign_in: "Daxil ol",
        control_sign_out: "Çıxış",
        control_subscribed_feed: "Abunə lentı",
        status_ready: "Hazır",
        status_playing: "Oynayır",
        status_paused: "Dayandı",
        status_ended: "Bitdi",
        message_sign_in: "Xahiş olunur daxil olun.",
        message_sign_in_first: "Əvvəlcə daxil olun.",
        message_email_verified: "Email artıq təsdiqlənib.",
        message_verification_sent: "Təsdiq emaili göndərildi.",
        message_verification_failed: "Təsdiq emaili göndərilmədi.",
        message_verification_needed: "İzləmək üçün emaili təsdiqləyin.",
        message_verification_prompt: "Təsdiq emaili göndərildi. Davam etmək üçün təsdiqləyin.",
        message_email_required: "Email tələb olunur.",
        message_reset_sent: "Şifrə sıfırlama emaili göndərildi.",
        message_reset_failed: "Şifrə sıfırlama alınmadı.",
        message_auth_failed: "Firebase auth hazır deyil.",
        message_login_failed: "Daxil olmaq alınmadı.",
        message_register_failed: "Qeydiyyat alınmadı.",
        message_password_required: "Şifrə tələb olunur.",
        message_password_check_failed: "Şifrə yoxlaması uğursuz oldu.",
        message_youTube_required: "YouTube linki tələb olunur.",
        message_add_video_failed: "Video əlavə olunmadı.",
        message_loading_stats: "Yüklənir...",
        message_no_channels: "Hələ kanal yoxdur.",
        message_no_subscriptions: "Hələ abunə yoxdur.",
        message_channel_unavailable: "Kanal əlçatan deyil.",
        message_no_channel_videos: "Bu kanalda video yoxdur.",
        message_no_videos: "Hələ video yoxdur.",
        message_no_viral: "Hələ viral video yoxdur.",
        message_fetch_viral_failed: "Viral videolar yüklənmədi.",
        label_creator: "Yaradıcı",
        label_minutes: "dəq",
        label_views: "baxış",
        label_hearts: "ürək",
        label_untitled: "Başlıqsız",
        label_videos: "video",
        label_subs: "abunə",
        label_plan: "Plan:",
        label_artists: "artist",
        label_artist_stats: "Artist statistikası",
        label_all_videos: "Bütün videolar",
        label_your_videos: "Sənin videoların",
        label_subscribe: "Abunə ol",
        label_subscribed: "Abunə",
        label_unsubscribe: "Abunəni dayandır",
        label_reported_by: "Şikayət edən",
        label_update: "Yeniləmə",
        label_read: "Oxundu",
        label_resolved: "Həll edildi",
        label_auto_next: "Avto növbəti: ",
        label_up_next: "Növbəti: ",
        control_dark_mode: "Tünd rejim",
        control_light_mode: "Açıq rejim",
        control_party_mode: "Şən rejim",
        control_start: "Videonu başladın",
        control_heart_loved: "Sevildi",
        contact_button: "HƏRŞEY ÜÇÜN ƏLAQƏ DÜYMƏSİ",
        contact_title: "Əlaqə",
        contact_whatsapp: "WhatsApp: +994554195347",
        contact_instagram: "Instagram: @islammuradovtahir",
        admin_grant_artist: "Artist rolu ver",
        admin_make_artist: "Artist et",
        admin_make_user: "İstifadəçi et",
        admin_stats: "Statistika",
        admin_videos_open: "Video idarəetmə",
        admin_videos_page_title: "Video idarəetmə",
        admin_set_free: "Free et",
        admin_set_pro: "Pro et",
        admin_tab_overview: "Ümumi",
        admin_tab_users: "İstifadəçilər",
        admin_tab_channels: "Kanallar",
        admin_tab_videos: "Videolar",
        admin_tab_reports: "Şikayətlər",
        admin_tab_imports: "İdxal",
        admin_users_hint: "İstifadəçi axtar",
        admin_users_search: "İstifadəçi axtar",
        admin_channels_hint: "Artistlər və kanallar",
        admin_channels_search: "Kanal axtar",
        admin_videos_hint: "Bütün videolar",
        admin_videos_search: "Video axtar",
        admin_view_videos: "Videolara bax",
        admin_video_language: "Dil",
        admin_report_message_placeholder: "Şikayət edənə mesaj (istəyə bağlı)",
        action_resolve: "Həll et",
        action_delete: "Sil",
        action_save: "Yadda saxla",
        action_mark_read: "Oxundu işarələ",
        message_auth_required: "Auth qurulması tələb olunur.",
        message_verify_needed: "Davam etmək üçün emaili təsdiqləyin.",
        message_queue_single_auto: "Avto növbəti aktivdir, amma sırada bir video var.",
        message_queue_single: "Sıra burada bitir. Hazır olanda təkrar oynadın.",
        message_no_subscribed_videos: "Abunələrdə hələ video yoxdur.",
        message_reports_failed: "Şikayətlər yüklənmədi.",
        message_reports_empty: "Hələ şikayət yoxdur.",
        message_select_csv: "Əvvəlcə CSV faylı seçin.",
        message_import_failed: "İdxal alınmadı.",
        message_imported: "İdxal edildi:",
        message_skipped: "Keçildi:",
        message_paste_sql: "Əvvəlcə SQL yapışdırın.",
        message_export_failed: "Eksport alınmadı.",
        message_profile_load_failed: "Profil yüklənmədi.",
        message_profile_save_failed: "Profil yadda saxlanmadı.",
        message_profile_saved: "Profil yadda saxlanıldı.",
        message_history_unavailable: "Tarixçə əlçatan deyil.",
        message_stats_unavailable: "Statistika əlçatan deyil.",
        message_settings_save_failed: "Ayarlar yadda saxlanmadı.",
        message_no_topics: "Mövzu tapılmadı.",
        message_no_history: "Bu gün baxış yoxdur.",
        message_report_failed: "Şikayət göndərilmədi.",
        message_no_video_selected: "Video seçilməyib.",
        message_reason_short: "Səbəb ən az 5 simvol olmalıdır.",
        message_report_thanks: "Şikayət göndərildi. Təşəkkürlər!",
        message_no_updates: "Hələ yenilik yoxdur.",
        status_buffering: "Yüklənir",
        status_error: "Oynatma xətası",
        status_limit_reached: "Limit doldu",
        status_empty: "Video yoxdur",
        limit_title: "Bu gün üçün vaxt bitdi",
        limit_copy: "Gündəlik limit doldu."
      },
      ar: {
        search_label: "بحث",
        sidebar_toggle: "تبديل الشريط الجانبي",
        sidebar_show: "إظهار الشريط الجانبي",
        controls_hide: "إخفاء عناصر التحكم",
        controls_show: "إظهار عناصر التحكم",
        tech_panel_toggle: "أدوات المشغل",
        search_placeholder: "ابحث عن الفيديوهات والقنوات",
        ui_language_label: "اللغة",
        sidebar_subscribed: "المشتركات",
        sidebar_channels: "القنوات",
        status_loading: "جارٍ التحميل",
        player_loading: "جارٍ تجهيز المشغل...",
        overlay_ready: "جاهز للتشغيل",
        overlay_tap_start: "اضغط تشغيل للبدء",
        overlay_autoplay_note: "قد يتم حظر التشغيل التلقائي. اضغط تشغيل للبدء.",
        overlay_complete: "انتهى!",
        overlay_next_prompt: "هل نُشاهد واحداً آخر؟",
        overlay_next_copy: "أعد التشغيل أو افتح التالي.",
        video_select: "اختر فيديو",
        timeline_label: "خط زمن الفيديو",
        timeline_seek: "التحكم في خط الزمن",
        quality_auto: "تلقائي",
        captions_label: "لغة الترجمة",
        captions_off: "الترجمة متوقفة",
        feed_recommended: "موصى به",
        feed_filter_hint: "المشتركات فقط",
        feed_intro: "اختيارات جديدة للأطفال",
        feed_subscribed: "القنوات التي تتابعها فقط",
        feed_load_hint: "المزيد من الفيديوهات بالأسفل",
        feed_load_more: "تحميل المزيد",
        feed_viral: "شائع",
        channel_title: "القناة",
        search_results: "نتائج البحث عن",
        search_title: "نتائج البحث",
        search_back: "العودة للرئيسية",
        search_no_results: "لا توجد نتائج. جرّب كلمة أخرى.",
        search_fallback_recommended: "موصى به",
        search_fallback_viral: "شائع",
        channels_open: "كل القنوات",
        channels_title: "القنوات",
        channels_back: "العودة للرئيسية",
        channels_search_hint: "ابحث عن قناة",
        channels_search_placeholder: "ابحث عن القنوات",
        channels_sort: "ترتيب القنوات",
        channels_sort_popular: "الأكثر شعبية",
        channels_sort_videos: "الأكثر فيديوهات",
        channels_sort_name: "حسب الاسم",
        channels_filter_subscribed: "المشتركات فقط",
        auth_welcome: "أهلاً بالأهل!",
        auth_subtitle: "أنشئ مساحة آمنة للأطفال. سجّل الدخول أو أنشئ حساباً.",
        auth_email: "البريد الإلكتروني",
        auth_password: "كلمة المرور",
        auth_sign_in: "تسجيل الدخول",
        auth_new_email: "بريد جديد",
        auth_new_password: "كلمة مرور جديدة",
        auth_create_account: "إنشاء حساب",
        auth_resend: "إعادة إرسال التحقق",
        auth_forgot: "نسيت كلمة المرور",
        auth_sign_out: "تسجيل الخروج",
        settings_unlock_title: "تحقق الوالدين",
        settings_unlock_copy: "أدخل كلمة المرور لفتح رقابة الوالدين.",
        upload_title: "إضافة فيديو يوتيوب",
        upload_url: "رابط يوتيوب",
        upload_url_placeholder: "https://www.youtube.com/watch?v=...",
        upload_languages: "اللغات",
        upload_topics: "المواضيع (مفصولة بفواصل)",
        upload_topics_placeholder: "nastya, masha, minecraft",
        upload_add: "إضافة فيديو",
        upload_hint: "سيتم تعبئة العنوان تلقائياً من يوتيوب إن توفر.",
        admin_title: "لوحة الإدارة",
        admin_overview: "نظرة عامة للإدارة",
        admin_users: "مستخدمو الإدارة",
        admin_channels: "قنوات الإدارة",
        admin_imports: "استيراد الإدارة",
        admin_overview_title: "نظرة عامة للإدارة",
        admin_users_title: "مستخدمو الإدارة",
        admin_channels_title: "قنوات الإدارة",
        admin_reports_title: "بلاغات الإدارة",
        admin_imports_title: "استيراد الإدارة",
        admin_reports: "البلاغات",
        admin_import_hint: "استيراد روابط يوتيوب المعتمدة (CSV أو SQL).",
        admin_csv_label: "ملف CSV",
        admin_import_csv: "استيراد CSV",
        admin_export_sql: "تحميل SQL",
        admin_sql_label: "استيراد SQL (INSERT INTO videos)",
        admin_sql_placeholder: "الصق تصدير SQL هنا...",
        admin_import_sql: "استيراد SQL",
        admin_grant_hint: "امنح دور الفنان لإضافة فيديوهات.",
        studio_title: "الاستوديو",
        studio_profile: "ملف المبدع",
        studio_name: "الاسم الظاهر",
        studio_name_placeholder: "اسم المبدع",
        studio_slogan: "شعار قصير",
        studio_slogan_placeholder: "شعار ممتع",
        studio_avatar: "رابط صورة الملف",
        studio_avatar_placeholder: "https://...",
        studio_save: "حفظ الملف",
        studio_stats: "إحصاءاتك",
        settings_title: "رقابة الوالدين",
        settings_languages: "اللغات المعروضة",
        settings_topics: "المواضيع للتحكم",
        settings_topic_allow: "عرض المحدد فقط",
        settings_topic_block: "إخفاء المحدد",
        settings_topic_search: "ابحث عن موضوع",
        settings_topic_placeholder: "ابحث عن المواضيع",
        settings_channels: "القنوات للتحكم",
        settings_channel_allow: "عرض المحدد فقط",
        settings_channel_block: "إخفاء المحدد",
        settings_channel_search: "ابحث عن قناة",
        settings_channel_placeholder: "ابحث عن القنوات",
        settings_mode_off: "غير مستخدم",
        settings_religions: "الديانات للتحكم",
        settings_religion_allow: "السماح بالمحدد فقط",
        settings_religion_block: "إخفاء المحدد",
        settings_watch_limit: "حد المشاهدة اليومي (بالساعات)",
        settings_password: "التأكيد بكلمة المرور",
        settings_save: "حفظ الإعدادات",
        settings_history: "سجل اليوم",
        report_title: "الإبلاغ عن فيديو",
        report_reason: "السبب",
        report_placeholder: "اكتب المشكلة (حد أدنى 5 أحرف)",
        report_send: "إرسال البلاغ",
        signout_title: "تأكيد تسجيل الخروج",
        updates_title: "التحديثات",
        action_close: "إغلاق",
        action_continue: "متابعة",
        lang_english: "الإنجليزية",
        lang_russian: "الروسية",
        lang_chinese: "الصينية",
        lang_turkish: "التركية",
        lang_azerbaijani: "الأذربيجانية",
        lang_arabic: "العربية",
        control_volume_down: "خفض الصوت",
        control_volume_up: "رفع الصوت",
        control_report: "إبلاغ",
        control_replay: "إعادة",
        control_next: "الفيديو التالي",
        control_heart: "قلب",
        control_auto_next_off: "التشغيل التالي تلقائياً متوقف",
        control_auto_next_on: "التشغيل التالي تلقائياً مفعل",
        control_play: "تشغيل",
        control_pause: "إيقاف مؤقت",
        control_mute: "كتم",
        control_unmute: "إلغاء الكتم",
        control_fullscreen: "ملء الشاشة",
        control_exit_fullscreen: "الخروج من ملء الشاشة",
        control_seek_back: "للخلف 30 ثانية",
        control_seek_forward: "للأمام 30 ثانية",
        control_theater: "سينما",
        control_mini: "مشغل مصغر",
        control_add_video: "إضافة فيديو",
        control_admin: "إدارة",
        control_studio: "الاستوديو",
        control_settings: "الإعدادات",
        control_updates: "التحديثات",
        control_sign_in: "تسجيل الدخول",
        control_sign_out: "تسجيل الخروج",
        control_subscribed_feed: "خلاصة المشتركين",
        status_ready: "جاهز",
        status_playing: "يعمل",
        status_paused: "متوقف مؤقتاً",
        status_ended: "انتهى",
        message_sign_in: "يرجى تسجيل الدخول.",
        message_sign_in_first: "يرجى تسجيل الدخول أولاً.",
        message_email_verified: "البريد مؤكد بالفعل.",
        message_verification_sent: "تم إرسال بريد التحقق.",
        message_verification_failed: "تعذر إرسال بريد التحقق.",
        message_verification_needed: "يرجى تأكيد البريد قبل المشاهدة.",
        message_verification_prompt: "تم إرسال بريد التحقق، يرجى التأكيد للمتابعة.",
        message_email_required: "البريد الإلكتروني مطلوب.",
        message_reset_sent: "تم إرسال بريد إعادة تعيين كلمة المرور.",
        message_reset_failed: "فشل إعادة تعيين كلمة المرور.",
        message_auth_failed: "مصادقة Firebase غير جاهزة.",
        message_login_failed: "فشل تسجيل الدخول.",
        message_register_failed: "فشل التسجيل.",
        message_password_required: "كلمة المرور مطلوبة.",
        message_password_check_failed: "فشل التحقق من كلمة المرور.",
        message_youTube_required: "رابط يوتيوب مطلوب.",
        message_add_video_failed: "فشل إضافة الفيديو.",
        message_loading_stats: "جارٍ التحميل...",
        message_no_channels: "لا توجد قنوات بعد.",
        message_no_subscriptions: "لا توجد اشتراكات بعد.",
        message_channel_unavailable: "القناة غير متاحة.",
        message_no_channel_videos: "لا توجد فيديوهات في هذه القناة بعد.",
        message_no_videos: "لا توجد فيديوهات بعد.",
        message_no_viral: "لا توجد فيديوهات شائعة بعد.",
        message_fetch_viral_failed: "تعذر تحميل الفيديوهات الشائعة.",
        label_creator: "المنشئ",
        label_minutes: "دقيقة",
        label_views: "مشاهدة",
        label_hearts: "قلوب",
        label_untitled: "بدون عنوان",
        label_videos: "فيديوهات",
        label_subs: "مشتركين",
        label_plan: "الخطة:",
        label_artists: "مبدعين",
        label_artist_stats: "إحصاءات المبدعين",
        label_all_videos: "كل الفيديوهات",
        label_your_videos: "فيديوهاتك",
        label_subscribe: "اشتراك",
        label_subscribed: "مشترك",
        label_unsubscribe: "إلغاء الاشتراك",
        label_reported_by: "المبلّغ",
        label_update: "تحديث",
        label_read: "مقروء",
        label_resolved: "تم الحل",
        label_auto_next: "التالي تلقائياً: ",
        label_up_next: "التالي: ",
        control_dark_mode: "الوضع الداكن",
        control_light_mode: "الوضع الفاتح",
        control_party_mode: "وضع المرح",
        control_start: "بدء الفيديو",
        control_heart_loved: "أُعجب به",
        contact_button: "زر التواصل لكل شيء",
        contact_title: "تواصل",
        contact_whatsapp: "WhatsApp: +994554195347",
        contact_instagram: "Instagram: @islammuradovtahir",
        admin_grant_artist: "منح دور فنان",
        admin_make_artist: "تحويل إلى فنان",
        admin_make_user: "تحويل إلى مستخدم",
        admin_stats: "الإحصاءات",
        admin_videos_open: "إدارة الفيديوهات",
        admin_videos_page_title: "إدارة الفيديوهات",
        admin_set_free: "تعيين مجاني",
        admin_set_pro: "تعيين برو",
        admin_tab_overview: "نظرة عامة",
        admin_tab_users: "المستخدمون",
        admin_tab_channels: "القنوات",
        admin_tab_videos: "الفيديوهات",
        admin_tab_reports: "البلاغات",
        admin_tab_imports: "الاستيراد",
        admin_users_hint: "ابحث عن المستخدمين",
        admin_users_search: "ابحث عن المستخدمين",
        admin_channels_hint: "الفنانون والقنوات",
        admin_channels_search: "ابحث عن القنوات",
        admin_videos_hint: "كل الفيديوهات",
        admin_videos_search: "ابحث عن الفيديوهات",
        admin_view_videos: "عرض الفيديوهات",
        admin_video_language: "اللغة",
        admin_report_message_placeholder: "رسالة للمبلّغ (اختياري)",
        action_resolve: "حل",
        action_delete: "حذف",
        action_save: "حفظ",
        action_mark_read: "وضع كمقروء",
        message_auth_required: "يلزم إعداد المصادقة.",
        message_verify_needed: "يرجى تأكيد البريد للمتابعة.",
        message_queue_single_auto: "التالي تلقائياً مفعّل لكن هناك فيديو واحد فقط.",
        message_queue_single: "انتهت القائمة. أعد التشغيل عند الاستعداد.",
        message_no_subscribed_videos: "لا توجد فيديوهات ضمن الاشتراكات بعد.",
        message_reports_failed: "تعذر تحميل البلاغات.",
        message_reports_empty: "لا توجد بلاغات بعد.",
        message_select_csv: "اختر ملف CSV أولاً.",
        message_import_failed: "فشل الاستيراد.",
        message_imported: "تم الاستيراد:",
        message_skipped: "تم التخطي:",
        message_paste_sql: "الصق SQL أولاً.",
        message_export_failed: "فشل التصدير.",
        message_profile_load_failed: "تعذر تحميل الملف.",
        message_profile_save_failed: "تعذر حفظ الملف.",
        message_profile_saved: "تم حفظ الملف.",
        message_history_unavailable: "السجل غير متاح.",
        message_stats_unavailable: "الإحصاءات غير متاحة.",
        message_settings_save_failed: "تعذر حفظ الإعدادات.",
        message_no_topics: "لم يتم العثور على مواضيع.",
        message_no_history: "لا توجد مشاهدة اليوم.",
        message_report_failed: "فشل إرسال البلاغ.",
        message_no_video_selected: "لم يتم اختيار فيديو.",
        message_reason_short: "يجب أن يكون السبب 5 أحرف على الأقل.",
        message_report_thanks: "تم إرسال البلاغ. شكرًا لك!",
        message_no_updates: "لا توجد تحديثات بعد.",
        status_buffering: "جارٍ التخزين المؤقت",
        status_error: "خطأ في التشغيل",
        status_limit_reached: "تم الوصول للحد",
        status_empty: "لا يوجد فيديو",
        limit_title: "انتهى الوقت لهذا اليوم",
        limit_copy: "تم الوصول إلى الحد اليومي."
      }
    };

    function getUiLanguage() {
      return localStorage.getItem("uiLang") || "en";
    }

    function t(key) {
      const lang = getUiLanguage();
      return (translations[lang] && translations[lang][key]) || translations.en[key] || key;
    }

    function applyTranslations() {
      const lang = getUiLanguage();
      document.documentElement.lang = lang;
      document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
      document.querySelectorAll("[data-i18n]").forEach((node) => {
        node.textContent = t(node.getAttribute("data-i18n"));
      });
      document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
        node.setAttribute("placeholder", t(node.getAttribute("data-i18n-placeholder")));
      });
      document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
        node.setAttribute("aria-label", t(node.getAttribute("data-i18n-aria")));
      });
      initControlIcons();
      updateNextUp();
      updateVideoMeta(currentVideo);
      updateStatus(currentStatusKey);
    }

    function setUiLanguage(lang) {
      const next = translations[lang] ? lang : "en";
      localStorage.setItem("uiLang", next);
      if (ui.uiLanguage) {
        ui.uiLanguage.value = next;
      }
      applyTranslations();
      if (ui.navRequests && ui.navRequests.querySelector("span")) {
        ui.navRequests.querySelector("span").textContent = "Xahiş et";
      }
    }

    function setButtonIcon(button, icon, labelKey, suffix) {
      const extra = suffix ? "<span class=\"count\">" + suffix + "</span>" : "";
      button.innerHTML = icon + extra;
      if (labelKey) {
        const label = t(labelKey);
        button.setAttribute("aria-label", label);
        button.title = label;
        button.setAttribute("data-label", label);
      }
    }

    function stopPlayback() {
      if (player && player.pauseVideo) {
        player.pauseVideo();
      }
      currentVideo = null;
      updateVideoMeta(null);
      setOverlayState(false, false, false);
      updateStatus("status_empty");
    }

    function updateNotificationBadge(hasUnread) {
      if (!ui.notificationsOpen) {
        return;
      }
      ui.notificationsOpen.classList.toggle("has-unread", Boolean(hasUnread));
    }

    function escapeHtml(value) {
      return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\"/g, "&quot;")
        .replace(/'/g, "&#39;");
    }

    function setAvatar(element, url) {
      if (!element) {
        return;
      }
      const clean = String(url || "").trim();
      if (clean) {
        element.style.backgroundImage = "url('" + clean + "')";
        element.classList.add("avatar-image");
      } else {
        element.style.backgroundImage = "";
        element.classList.remove("avatar-image");
      }
    }

    function initControlIcons() {
      setButtonIcon(ui.volumeDown, icons.minus, "control_volume_down");
      setButtonIcon(ui.volumeUp, icons.plus, "control_volume_up");
      setButtonIcon(ui.controlsReport, icons.report, "control_report");
      setButtonIcon(ui.controlsReplay, icons.replay, "control_replay");
      setButtonIcon(ui.controlsNext, icons.next, "control_next");
      setButtonIcon(ui.controlsHeart, icons.heart, "control_heart", "0");
      setButtonIcon(ui.autoNextToggle, icons.autoNext, "control_auto_next_off");
      setButtonIcon(ui.playToggle, icons.play, "control_play");
      setButtonIcon(ui.muteToggle, icons.mute, "control_mute");
      setButtonIcon(ui.controlsFullscreen, icons.fullscreen, "control_fullscreen");
      setButtonIcon(ui.controlsSeekBack, icons.seekBack, "control_seek_back");
      setButtonIcon(ui.controlsSeekForward, icons.seekForward, "control_seek_forward");
      setButtonIcon(ui.controlsToggle, icons.dockHide, "controls_hide");
      setButtonIcon(ui.viewTheater, icons.theater, "control_theater");
      setButtonIcon(ui.viewMini, icons.mini, "control_mini");
      setButtonIcon(ui.uploadOpen, icons.upload, "control_add_video");
      setButtonIcon(ui.adminOpen, icons.admin, "control_admin");
      setButtonIcon(ui.adminVideosOpen, icons.admin, "admin_videos_open");
      setButtonIcon(ui.adminOverviewOpen, icons.admin, "admin_overview");
      setButtonIcon(ui.adminUsersOpen, icons.users, "admin_users");
      setButtonIcon(ui.adminChannelsOpen, icons.channels, "admin_channels");
      setButtonIcon(ui.adminReportsOpen, icons.reports, "admin_reports");
      setButtonIcon(ui.adminImportsOpen, icons.imports, "admin_imports");
      setButtonIcon(ui.studioOpen, icons.studio, "control_studio");
      setButtonIcon(ui.settingsOpen, icons.settings, "control_settings");
      setButtonIcon(ui.settingsBar, icons.settings, "control_settings");
      setButtonIcon(ui.notificationsOpen, icons.bell, "control_updates");
      setButtonIcon(ui.authOpen, icons.user, "control_sign_in");
      setButtonIcon(ui.authLogout, icons.logout, "control_sign_out");
      setButtonIcon(ui.filterSubscribed, icons.check, "control_subscribed_feed");
      setButtonIcon(ui.channelsPageOpen, icons.channels, "channels_open");
    }

    let player = null;
    let isPlayerReady = false;
    let timeTicker = null;
    let playerReloadTimer = null;
    let videos = [];
    let currentIndex = 0;
    let autoNextEnabled = false;
    let isSeeking = false;
    let token = "";
    let currentUser = null;
    let stateSignalTimer = null;
    let seekSignalTimer = null;
    let userQualityChoice = false;
    let pageOffset = 0;
    const pageLimit = 32;
    const searchLimit = 20;
    let hasMore = true;
    let isFetching = false;
    let subscriptions = [];
    let currentVideo = null;
    let currentStatusKey = "status_loading";
    let feedFilter = "all";
    let currentChannel = null;
    let searchQuery = "";
    let searchOffset = 0;
    let searchHasMore = true;
    let searchFetching = false;
    let channelsQuery = "";
    let channelsOffset = 0;
    let channelsHasMore = true;
    let channelsFetching = false;
    let channelsData = [];
    let firebaseAuth = null;
    let firebaseUser = null;
    let availableTopics = [];
    let settingsSelectedTopics = new Set();
    let settingsAvailableChannels = [];
    let settingsSelectedChannels = new Set();
    let settingsSelectedReligions = new Set();
    let adminUsersData = [];
    let adminChannelsData = [];
    let adminVideosData = [];
    let adminVideosQuery = "";
    let adminVideosOffset = 0;
    let adminVideosHasMore = true;
    let adminVideosFetching = false;
    let adminVideosOwnerId = "";
    let adminUsersPageQuery = "";
    let adminUsersPageOffset = 0;
    let adminUsersPageHasMore = true;
    let adminUsersPageFetching = false;
    let adminChannelsPageQuery = "";
    let adminChannelsPageOffset = 0;
    let adminChannelsPageHasMore = true;
    let adminChannelsPageFetching = false;
    let dockCollapsed = localStorage.getItem("dockCollapsed") === "true";
    let navFocus = "home";
    let settingsUnlockedAt = 0;
    const SETTINGS_UNLOCK_MS = 10 * 60 * 1000;
    const PLAYER_RELOAD_TIMEOUT_MS = 12000;
    const PLAYER_RELOAD_KEY = "playerReloads";

    function setTheme() {
      document.body.setAttribute("data-theme", "light");
      if (ui.themeToggle) {
        ui.themeToggle.style.display = "none";
      }
      localStorage.setItem("theme", "light");
    }

    function setView(mode) {
      ui.playerArea.classList.remove("theater", "mini");
      ui.viewTheater.classList.remove("active");
      ui.viewMini.classList.remove("active");
      if (mode === "theater") {
        ui.playerArea.classList.add("theater");
        ui.viewTheater.classList.add("active");
      } else if (mode === "mini") {
        ui.playerArea.classList.add("mini");
        ui.viewMini.classList.add("active");
      }
    }

    function setDockCollapsed(collapsed) {
      dockCollapsed = Boolean(collapsed);
      ui.controlDock.classList.toggle("collapsed", dockCollapsed);
      setButtonIcon(
        ui.controlsToggle,
        dockCollapsed ? icons.dockShow : icons.dockHide,
        dockCollapsed ? "controls_show" : "controls_hide"
      );
      localStorage.setItem("dockCollapsed", String(dockCollapsed));
    }

    function openDrawer() {
      if (!ui.actionDrawer || !ui.drawerOverlay || !ui.drawerToggle) return;
      ui.actionDrawer.style.display = "grid";
      ui.actionDrawer.classList.add("open");
      ui.actionDrawer.setAttribute("aria-hidden", "false");
      ui.drawerOverlay.classList.add("active");
      ui.drawerToggle.setAttribute("aria-expanded", "true");
      document.body.classList.add("drawer-open");
    }

    function closeDrawer() {
      if (!ui.actionDrawer || !ui.drawerOverlay || !ui.drawerToggle) return;
      ui.actionDrawer.classList.remove("open");
      ui.actionDrawer.setAttribute("aria-hidden", "true");
      ui.drawerOverlay.classList.remove("active");
      ui.drawerToggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("drawer-open");
      setTimeout(() => {
        if (!ui.actionDrawer.classList.contains("open")) {
          ui.actionDrawer.style.display = "grid";
        }
      }, 250);
    }

    function toggleDrawer() {
      if (!ui.actionDrawer) return;
      if (ui.actionDrawer.classList.contains("open")) {
        closeDrawer();
      } else {
        openDrawer();
      }
    }

    function setPrimaryNav(view) {
      const isChannels = view === "channels";
      const isHomey = view === "feed" || view === "search" || view === "channel";
      const isViral = view === "viral";
      const isRequest = view === "request";
      const set = (node, active) => {
        if (node) {
          node.classList.toggle("active", Boolean(active));
        }
      };
      set(ui.navHome, isHomey && !isChannels && !isViral);
      set(ui.railHome, isHomey && !isChannels && !isViral);
      set(ui.navChannels, isChannels);
      set(ui.railChannels, isChannels);
      set(ui.navExplore, isViral);
      set(ui.railViral, isViral);
      if (ui.navRequests) {
        ui.navRequests.classList.toggle("active", isRequest);
      }
    }

    function updateRequestFields(reason) {
      if (!ui.requestDetails) return;
      if (reason === "video") {
        ui.requestDetails.placeholder = "Channel name, links, and topics you want";
      } else if (reason === "partnership") {
        ui.requestDetails.placeholder = "Who you are, brand/channel, how we collaborate";
      } else if (reason === "feature") {
        ui.requestDetails.placeholder = "Describe the feature you need";
      } else if (reason === "pro") {
        ui.requestDetails.placeholder = "Why you need Pro for a month";
      } else {
        ui.requestDetails.placeholder = "Tell us what you need";
      }
    }

    function schedulePlayerReload() {
      if (playerReloadTimer) {
        clearTimeout(playerReloadTimer);
      }
      playerReloadTimer = setTimeout(() => {
        if (isPlayerReady) {
          return;
        }
        const count = Number(sessionStorage.getItem(PLAYER_RELOAD_KEY) || "0");
        if (count >= 1) {
          return;
        }
        sessionStorage.setItem(PLAYER_RELOAD_KEY, String(count + 1));
        window.location.reload();
      }, PLAYER_RELOAD_TIMEOUT_MS);
    }

    function setPageView(view) {
      const showFeed = view === "feed";
      const showViral = view === "viral";
      const showChannel = view === "channel";
      const showWatch = view === "watch";
      const showSearch = view === "search";
      const showChannels = view === "channels";
      const showRequest = view === "request";
      const showAdminOverview = view === "admin-overview";
      const showAdminUsers = view === "admin-users";
      const showAdminChannels = view === "admin-channels";
      const showAdminVideos = view === "admin-videos";
      const showAdminReports = view === "admin-reports";
      const showAdminImports = view === "admin-imports";
      const isAdminView =
        showAdminOverview ||
        showAdminUsers ||
        showAdminChannels ||
        showAdminVideos ||
        showAdminReports ||
        showAdminImports;
      ui.feedView.classList.toggle("hidden", !showFeed);
      ui.feedView.setAttribute("aria-hidden", String(!showFeed));
      ui.viralView.classList.toggle("hidden", !showViral);
      ui.viralView.setAttribute("aria-hidden", String(!showViral));
      if (ui.requestView) {
        ui.requestView.classList.toggle("hidden", !showRequest);
        ui.requestView.setAttribute("aria-hidden", String(!showRequest));
      }
      ui.channelView.classList.toggle("hidden", !showChannel);
      ui.channelView.setAttribute("aria-hidden", String(!showChannel));
      ui.searchView.classList.toggle("hidden", !showSearch);
      ui.searchView.setAttribute("aria-hidden", String(!showSearch));
      ui.channelsPage.classList.toggle("hidden", !showChannels);
      ui.channelsPage.setAttribute("aria-hidden", String(!showChannels));
      ui.adminOverviewPage.classList.toggle("hidden", !showAdminOverview);
      ui.adminOverviewPage.setAttribute("aria-hidden", String(!showAdminOverview));
      ui.adminUsersPage.classList.toggle("hidden", !showAdminUsers);
      ui.adminUsersPage.setAttribute("aria-hidden", String(!showAdminUsers));
      ui.adminChannelsPage.classList.toggle("hidden", !showAdminChannels);
      ui.adminChannelsPage.setAttribute("aria-hidden", String(!showAdminChannels));
      ui.adminVideosPage.classList.toggle("hidden", !showAdminVideos);
      ui.adminVideosPage.setAttribute("aria-hidden", String(!showAdminVideos));
      ui.adminReportsPage.classList.toggle("hidden", !showAdminReports);
      ui.adminReportsPage.setAttribute("aria-hidden", String(!showAdminReports));
      ui.adminImportsPage.classList.toggle("hidden", !showAdminImports);
      ui.adminImportsPage.setAttribute("aria-hidden", String(!showAdminImports));
      if (ui.adminNav) {
        ui.adminNav.style.display = isAdminView && currentUser && currentUser.role === "admin" ? "flex" : "none";
      }
      const hidePlayer = !showWatch;
      ui.playerArea.classList.toggle("hidden", hidePlayer);
      ui.playerArea.style.display = hidePlayer ? "none" : "grid";
      if (hidePlayer && player && player.pauseVideo) {
        player.pauseVideo();
      }
      if (hidePlayer) {
        currentVideo = null;
        updateVideoMeta(null);
        setOverlayState(false, false, false);
      }
      if (showFeed) {
        updateSearchContext(ui.searchInput.value.trim());
      }
      if (showWatch) {
        updateSearchContext("");
      }
      if (view === "channels") {
        navFocus = "channels";
      } else if (view === "viral") {
        navFocus = "viral";
      } else if (view === "request") {
        navFocus = "request";
      } else if (navFocus === "channels" || navFocus === "viral" || navFocus === "request") {
        navFocus = "home";
      }
      setPrimaryNav(view);
      document.body.setAttribute("data-view", view);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function openModal(modal) {
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
    }

    function closeModal(modal) {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
    }

    function lockApp(message) {
      document.body.classList.add("locked");
      if (message) {
        ui.authMessage.textContent = message;
      }
    }

    function unlockApp() {
      document.body.classList.remove("locked");
    }

    const API_BASE = window.__API_BASE__ || "";

    function apiFetch(path, options = {}) {
      const headers = options.headers || {};
      if (!token && path.startsWith("/api/") && path !== "/api/firebase-config") {
        lockApp(t("message_sign_in"));
      }
      if (token) {
        headers.Authorization = "Bearer " + token;
      }
      return fetch(API_BASE + path, { ...options, headers });
    }

    function formatTime(seconds) {
      if (!Number.isFinite(seconds) || seconds <= 0) {
        return "0:00";
      }
      const total = Math.floor(seconds);
      const minutes = Math.floor(total / 60);
      const secs = total % 60;
      return minutes + ":" + String(secs).padStart(2, "0");
    }

    function updateSeekBarFill() {
      const max = Number(ui.seekBar.max) || 0;
      const value = Number(ui.seekBar.value) || 0;
      const percent = max > 0 ? Math.min(100, Math.max(0, (value / max) * 100)) : 0;
      ui.seekBar.style.background =
        "linear-gradient(90deg, var(--accent) 0%, var(--accent) " +
        percent +
        "%, #eadfd2 " +
        percent +
        "%, #eadfd2 100%)";
    }

    function syncTimelineDisplay() {
      if (!player || !isPlayerReady) {
        return;
      }
      const duration = player.getDuration ? player.getDuration() : 0;
      const current = player.getCurrentTime ? player.getCurrentTime() : 0;
      ui.timeCurrent.textContent = formatTime(current);
      ui.timeDuration.textContent = formatTime(duration);
      ui.seekBar.max = duration > 0 ? Math.floor(duration) : 0;
      if (!isSeeking) {
        ui.seekBar.value = Math.floor(current);
      }
      ui.seekBar.disabled = !videos.length || duration <= 0;
      updateSeekBarFill();
    }

    function syncVolumeDisplay() {
      if (!player || !isPlayerReady) {
        ui.volumeLevel.textContent = "--";
        ui.volumeDown.disabled = true;
        ui.volumeUp.disabled = true;
        return;
      }
      const volume = player.getVolume ? player.getVolume() : 0;
      ui.volumeLevel.textContent = volume + "%";
      ui.volumeDown.disabled = volume <= 0;
      ui.volumeUp.disabled = volume >= 100;
    }

    function syncControlLabels() {
      if (!player || !isPlayerReady) {
        setButtonIcon(ui.playToggle, icons.play, "control_play");
        setButtonIcon(ui.muteToggle, icons.mute, "control_mute");
        setButtonIcon(
          ui.autoNextToggle,
          icons.autoNext,
          autoNextEnabled ? "control_auto_next_on" : "control_auto_next_off"
        );
        ui.autoNextToggle.classList.toggle("toggle-on", autoNextEnabled);
        ui.playToggle.disabled = true;
        ui.muteToggle.disabled = true;
        ui.autoNextToggle.disabled = true;
        ui.seekBar.disabled = true;
        ui.qualitySelect.disabled = true;
        if (ui.captionSelect) {
          ui.captionSelect.disabled = true;
        }
        syncVolumeDisplay();
        syncTimelineDisplay();
        return;
      }
      const state = player.getPlayerState ? player.getPlayerState() : null;
      const playing = state === YT.PlayerState.PLAYING;
      setButtonIcon(
        ui.playToggle,
        playing ? icons.pause : icons.play,
        playing ? "control_pause" : "control_play"
      );
      const muted = player.isMuted && player.isMuted();
      setButtonIcon(
        ui.muteToggle,
        muted ? icons.volume : icons.mute,
        muted ? "control_unmute" : "control_mute"
      );
      setButtonIcon(
        ui.autoNextToggle,
        icons.autoNext,
        autoNextEnabled ? "control_auto_next_on" : "control_auto_next_off"
      );
      ui.autoNextToggle.classList.toggle("toggle-on", autoNextEnabled);
      ui.playToggle.disabled = false;
      ui.muteToggle.disabled = false;
      ui.autoNextToggle.disabled = false;
      ui.qualitySelect.disabled = false;
      if (ui.captionSelect) {
        ui.captionSelect.disabled = false;
      }
      syncVolumeDisplay();
      syncTimelineDisplay();
    }

    function updateFullscreenButton() {
      const isFull = Boolean(document.fullscreenElement);
      setButtonIcon(
        ui.controlsFullscreen,
        isFull ? icons.exitFullscreen : icons.fullscreen,
        isFull ? "control_exit_fullscreen" : "control_fullscreen"
      );
      document.body.classList.toggle("fullscreen-mode", isFull);
      ui.controlsFullscreen.classList.toggle("fullscreen-exit", isFull);
      if (ui.fullscreenExitBtn) {
        ui.fullscreenExitBtn.classList.toggle("visible", isFull);
      }
    }

    function updateStatus(label) {
      currentStatusKey = label;
      const title = videos[currentIndex] ? videos[currentIndex].title : t("message_no_videos");
      if (ui.statusChip) {
        ui.statusChip.textContent = t(label) + ": " + title;
        ui.statusChip.dataset.state = label;
        ui.statusChip.classList.remove("hidden");
      }
    }

    function flashState(type) {
      if (!ui.stateSignal || !ui.stateSignalIcon || !ui.stateSignalLabel) {
        return;
      }
      let iconMarkup = icons.play;
      let label = t("status_playing");
      let useLoader = false;
      if (type === "pause") {
        iconMarkup = icons.pause;
        label = t("status_paused");
      } else if (type === "buffer") {
        useLoader = true;
        label = t("status_buffering");
      } else if (type === "ended") {
        iconMarkup = icons.replay;
        label = t("status_ended");
      }
      ui.stateSignalIcon.innerHTML = useLoader ? '<span class="loader"></span>' : iconMarkup;
      ui.stateSignalLabel.textContent = label;
      ui.stateSignal.classList.add("show");
      clearTimeout(stateSignalTimer);
      stateSignalTimer = setTimeout(() => ui.stateSignal.classList.remove("show"), 900);
    }

    function flashSeek(deltaSeconds) {
      if (!ui.seekSignal || !ui.seekSignalIcon || !ui.seekSignalLabel) {
        return;
      }
      const isForward = deltaSeconds >= 0;
      const seconds = Math.max(1, Math.round(Math.abs(deltaSeconds)));
      ui.seekSignalIcon.innerHTML = isForward ? icons.seekForward : icons.seekBack;
      ui.seekSignalLabel.textContent = (isForward ? "+" : "-") + seconds + "s";
      ui.seekSignal.classList.add("show");
      clearTimeout(seekSignalTimer);
      seekSignalTimer = setTimeout(() => ui.seekSignal.classList.remove("show"), 800);
    }

    function updateSearchContext(query) {
      if (!ui.searchContext) {
        return;
      }
      let text = "";
      if (query) {
        text = t("search_results") + " \"" + query + "\"";
      } else if (feedFilter === "subscribed") {
        text = t("feed_subscribed");
      } else {
        text = t("feed_intro");
      }
      ui.searchContext.textContent = text;
      ui.searchContext.style.display = text ? "inline-flex" : "none";
    }

    function getPageLimit(query) {
      return query ? searchLimit : pageLimit;
    }

    function updateVideoMeta(video) {
      if (!video) {
        ui.videoTitle.textContent = t("video_select");
        ui.videoStats.textContent = "";
        ui.channelName.textContent = "";
        ui.channelSlogan.textContent = "";
        setAvatar(ui.channelAvatar, "");
        return;
      }
      const durationLabel = video.duration ? formatTime(video.duration) : "--:--";
      const views = video.views || 0;
      const hearts = video.hearts || 0;
      ui.videoTitle.textContent = video.title || t("label_untitled");
      ui.videoStats.textContent =
        views +
        " " +
        t("label_views") +
        " · " +
        hearts +
        " " +
        t("label_hearts") +
        " · " +
        durationLabel;
      ui.channelName.textContent = video.channel_name || t("label_creator");
      ui.channelSlogan.textContent = video.channel_slogan || "";
      setAvatar(ui.channelAvatar, video.channel_avatar);
    }

    function updateHeartButton() {
      if (!currentVideo) {
        setButtonIcon(ui.controlsHeart, icons.heart, "control_heart", "0");
        ui.controlsHeart.disabled = true;
        ui.controlsReport.disabled = true;
        return;
      }
      const count = currentVideo.hearts || 0;
      setButtonIcon(
        ui.controlsHeart,
        icons.heart,
        currentVideo.liked ? "control_heart_loved" : "control_heart",
        String(count)
      );
      ui.controlsHeart.disabled = !currentUser;
      ui.controlsReport.disabled = false;
    }

    function setOverlayState(loading, start, ended) {
      ui.loadingLayer.classList.toggle("active", loading);
      ui.startLayer.classList.toggle("active", start);
      ui.startLayer.setAttribute("aria-hidden", String(!start));
      ui.endCard.classList.toggle("active", ended);
      ui.endCard.setAttribute("aria-hidden", String(!ended));
      if (loading || start || ended) {
        if (ui.stateSignal) {
          ui.stateSignal.classList.remove("show");
        }
        if (ui.seekSignal) {
          ui.seekSignal.classList.remove("show");
        }
      }
    }

    function setPlayerState(state) {
      if (ui.playerShell) {
        ui.playerShell.dataset.state = state;
      }
    }

    function updateNextUp() {
      if (videos.length < 2) {
        ui.nextUp.textContent = autoNextEnabled
          ? t("message_queue_single_auto")
          : t("message_queue_single");
        return;
      }
      const nextIndex = (currentIndex + 1) % videos.length;
      const prefix = autoNextEnabled ? t("label_auto_next") : t("label_up_next");
      ui.nextUp.textContent = prefix + videos[nextIndex].title;
    }

    function openVideoPage(video) {
      if (!video) {
        return;
      }
      const targetPath = "/watch/" + video.id;
      if (window.location.pathname !== targetPath) {
        window.history.pushState({}, "", targetPath);
      }
      setPageView("watch");
      const index = videos.findIndex((item) => String(item.id) === String(video.id));
      if (index >= 0) {
        loadVideo(index);
      } else {
        playVideoById(video.id);
      }
    }

    async function loadVideo(index) {
      if (!videos.length || !player) {
        return;
      }
      const currentView = document.body.getAttribute("data-view");
      if (currentView !== "watch") {
        navigateTo("/watch/" + videos[index].id, { replace: true });
      }
      currentIndex = (index + videos.length) % videos.length;
      const video = videos[currentIndex];
      currentVideo = video;
      setPlayerState("loading");
      setOverlayState(true, false, false);
      updateStatus("status_loading");
      updateNextUp();
      updateHeartButton();
      updateVideoMeta(video);
      if (player.loadVideoById) {
        player.loadVideoById(video.youtube_id);
        setTimeout(setPreferredQuality, 120);
      }
      const res = await apiFetch("/api/videos/" + video.id + "/view", { method: "POST" });
      if (res.ok) {
        video.views = (video.views || 0) + 1;
        updateVideoMeta(video);
      } else if (res.status === 403) {
        const data = await res.json();
        setOverlayState(false, false, false);
        updateStatus("status_limit_reached");
        ui.startLayer.classList.add("active");
        ui.startLayer.setAttribute("aria-hidden", "false");
        ui.startLayer.querySelector("h2").textContent = t("limit_title");
        ui.startLayer.querySelector("p").textContent = data.error || t("limit_copy");
        if (player.pauseVideo) {
          player.pauseVideo();
        }
      }
    }

    async function loadNextVideo() {
      const targetIndex = currentIndex + 1;
      if (targetIndex < videos.length) {
        loadVideo(targetIndex);
        return;
      }
      if (hasMore) {
        const prevLength = videos.length;
        await fetchVideos(ui.searchInput.value.trim(), false);
        if (videos.length > prevLength) {
          loadVideo(prevLength);
        }
      }
    }

    function showChannelView(visible) {
      setPageView(visible ? "channel" : "feed");
    }

    function buildVideoCard(video, onSelect) {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "video-card";
      card.id = "video-card-" + video.id;
      card.name = "video-card-" + video.id;
      const lengthLabel = video.duration ? formatTime(video.duration) : "--:--";
      const thumbUrl = "https://img.youtube.com/vi/" + video.youtube_id + "/hqdefault.jpg";
      const thumb = document.createElement("div");
      thumb.className = "thumb";
      thumb.style.backgroundImage = "url('" + thumbUrl + "')";
      const stamp = document.createElement("span");
      stamp.textContent = lengthLabel;
      thumb.appendChild(stamp);
      const body = document.createElement("div");
      body.className = "card-body";
      const title = document.createElement("div");
      title.className = "card-title";
      title.textContent = video.title;
      const meta = document.createElement("div");
      meta.className = "card-meta";
      let channelNode;
      const channelName = video.channel_name || t("label_creator");
      if (video.channel_role === "artist") {
        const channelButton = document.createElement("button");
        channelButton.type = "button";
        channelButton.className = "link-button";
        channelButton.textContent = channelName;
        channelButton.addEventListener("click", (event) => {
          event.stopPropagation();
          navigateTo("/channel/" + video.owner_id);
        });
        channelNode = channelButton;
      } else {
        const channelLabel = document.createElement("span");
        channelLabel.textContent = channelName;
        channelNode = channelLabel;
      }
      const details = document.createElement("span");
      details.textContent =
        " · " +
        (video.views || 0) +
        " " +
        t("label_views") +
        " · " +
        (video.hearts || 0) +
        " " +
        t("label_hearts");
      meta.appendChild(channelNode);
      meta.appendChild(details);
      body.appendChild(title);
      body.appendChild(meta);
      card.appendChild(thumb);
      card.appendChild(body);
      card.addEventListener("click", () => onSelect(video));
      return card;
    }

    function renderVideoGrid(list, container, append = false, emptyMessage, onSelect) {
      if (!append) {
        container.innerHTML = "";
      }
      if (!list.length && !append) {
        const empty = document.createElement("div");
        empty.className = "empty-state";
        empty.textContent = emptyMessage || t("message_no_videos");
        container.appendChild(empty);
        return;
      }
      list.forEach((video) => {
        container.appendChild(buildVideoCard(video, onSelect));
      });
    }

    function renderRecommendations(list, append = false) {
      const message =
        feedFilter === "subscribed"
          ? t("message_no_subscribed_videos")
          : t("message_no_videos");
      renderVideoGrid(list, ui.recommendations, append, message, (video) => {
        openVideoPage(video);
      });
    }

    function createChannelRow(channel) {
      const isSubscribed = channel.is_subscribed;
      const row = document.createElement("div");
      row.className = "channel";
      row.addEventListener("click", () => navigateTo("/channel/" + channel.id));
      row.innerHTML =
        "<span class=\"avatar\" aria-hidden=\"true\"></span>" +
        "<div><div class=\"channel-name\">" +
        escapeHtml(channel.display_name || t("label_creator")) +
        "</div><div class=\"card-meta\">" +
        escapeHtml(channel.videos) +
        " " +
        t("label_videos") +
        " · " +
        escapeHtml(channel.subscribers || 0) +
        " " +
        t("label_subs") +
        "</div></div>";
      setAvatar(row.querySelector(".avatar"), channel.avatar_url);
      const actions = document.createElement("div");
      actions.className = "channel-actions";
      const button = document.createElement("button");
      button.type = "button";
      button.className = "pill icon-button";
      setButtonIcon(
        button,
        isSubscribed ? icons.check : icons.plus,
        isSubscribed ? "label_subscribed" : "label_subscribe"
      );
      button.addEventListener("click", (event) => {
        event.stopPropagation();
        toggleSubscription(channel.id);
      });
      actions.appendChild(button);
      row.appendChild(actions);
      return row;
    }

    function renderChannels(channels, container = ui.channelList) {
      if (!container) {
        return;
      }
      container.innerHTML = "";
      if (!channels.length) {
        container.textContent = t("message_no_channels");
        return;
      }
      channels.forEach((channel) => {
        container.appendChild(createChannelRow(channel));
      });
    }

    function renderChannelsPage(list, append = false) {
      if (!append) {
        ui.channelsPageList.innerHTML = "";
        channelsData = [];
      }
      if (!list.length && !append) {
        ui.channelsPageList.textContent = t("message_no_channels");
        return;
      }
      channelsData = channelsData.concat(list);
      applyChannelsFilters();
    }

    function applyChannelsFilters() {
      const sort = ui.channelsSort.value;
      const onlySubscribed = ui.channelsFilterSubscribed.checked;
      let filtered = channelsData.slice();
      if (onlySubscribed) {
        filtered = filtered.filter((channel) => channel.is_subscribed);
      }
      if (sort === "videos") {
        filtered.sort((a, b) => (b.videos || 0) - (a.videos || 0));
      } else if (sort === "name") {
        filtered.sort((a, b) => String(a.display_name || "").localeCompare(String(b.display_name || "")));
      } else {
        filtered.sort((a, b) => (b.subscribers || 0) - (a.subscribers || 0));
      }
      ui.channelsPageList.innerHTML = "";
      if (!filtered.length) {
        ui.channelsPageList.textContent = t("message_no_channels");
        return;
      }
      filtered.forEach((channel) => {
        ui.channelsPageList.appendChild(createChannelRow(channel));
      });
    }

    function renderSubscriptions() {
      if (!ui.subscribedList) {
        return;
      }
      ui.subscribedList.innerHTML = "";
      if (!subscriptions.length) {
        ui.subscribedList.textContent = t("message_no_subscriptions");
        return;
      }
      subscriptions.forEach((channel) => {
        const row = document.createElement("div");
        row.className = "channel";
        row.addEventListener("click", () => navigateTo("/channel/" + channel.id));
        row.innerHTML =
          "<span class=\"avatar\" aria-hidden=\"true\"></span>" +
          "<div><div class=\"channel-name\">" +
          escapeHtml(channel.display_name || t("label_creator")) +
          "</div><div class=\"card-meta\">" +
          escapeHtml(channel.subscribers || 0) +
          " " +
          t("label_subs") +
          "</div></div>";
        setAvatar(row.querySelector(".avatar"), channel.avatar_url);
        const actions = document.createElement("div");
        actions.className = "channel-actions";
        const button = document.createElement("button");
        button.type = "button";
        button.className = "pill icon-button";
        setButtonIcon(button, icons.minus, "label_unsubscribe");
        button.addEventListener("click", (event) => {
          event.stopPropagation();
          toggleSubscription(channel.id);
        });
        actions.appendChild(button);
        row.appendChild(actions);
        ui.subscribedList.appendChild(row);
      });
    }

    function setFeedFilter(nextFilter) {
      if (nextFilter === "subscribed" && !currentUser) {
        lockApp(t("message_sign_in"));
        return;
      }
      feedFilter = nextFilter;
      ui.filterSubscribed.classList.toggle("active", feedFilter === "subscribed");
      showChannelView(false);
      fetchVideos(ui.searchInput.value.trim(), true);
    }

    async function openChannel(channelId, fromRoute = false) {
      if (!fromRoute) {
        navigateTo("/channel/" + channelId);
        return;
      }
      showChannelView(true);
      ui.channelVideos.innerHTML = t("status_loading");
      const channelRes = await apiFetch("/api/channels/" + channelId);
      const channelData = await channelRes.json();
      if (!channelRes.ok || !channelData.channel) {
        ui.channelVideos.textContent = t("message_channel_unavailable");
        return;
      }
      currentChannel = channelData.channel;
      ui.channelTitle.textContent = currentChannel.display_name || t("label_creator");
      ui.channelStats.textContent =
        currentChannel.videos +
        " " +
        t("label_videos") +
        " · " +
        currentChannel.subscribers +
        " " +
        t("label_subs");
      ui.channelSloganView.textContent = currentChannel.slogan || "";
      const heroAvatar = ui.channelView.querySelector(".channel-hero .avatar");
      setAvatar(heroAvatar, currentChannel.avatar_url);
      setButtonIcon(
        ui.channelSubscribe,
        currentChannel.is_subscribed ? icons.check : icons.plus,
        currentChannel.is_subscribed ? "label_subscribed" : "label_subscribe"
      );
      ui.channelSubscribe.disabled = Boolean(
        currentUser && String(currentUser.id) === String(currentChannel.id)
      );
      const params = new URLSearchParams();
      params.set("limit", "50");
      params.set("offset", "0");
      params.set("channelId", String(channelId));
      const videosRes = await apiFetch("/api/videos?" + params.toString());
      const videosData = await videosRes.json();
      videos = videosData.videos || [];
      renderVideoGrid(
        videos,
        ui.channelVideos,
        false,
        t("message_no_channel_videos"),
        (video) => {
          openVideoPage(video);
        }
      );
      if (videos.length) {
        updateVideoMeta(videos[0]);
      } else {
        setOverlayState(false, false, false);
        updateStatus("status_empty");
      }
    }

    async function toggleSubscription(channelId) {
      if (!currentUser) {
        lockApp(t("message_sign_in"));
        return;
      }
      const res = await apiFetch("/api/subscriptions/" + channelId, { method: "POST" });
      if (!res.ok) {
        return;
      }
      await fetchSubscriptions();
      await fetchChannels();
      if (currentChannel && String(currentChannel.id) === String(channelId)) {
        await openChannel(channelId, true);
      }
    }

    async function fetchVideos(query, reset = false) {
      if (isFetching) {
        return;
      }
      if (!currentUser) {
        return;
      }
      isFetching = true;
      if (reset) {
        pageOffset = 0;
        videos = [];
        hasMore = true;
      }
      setPageView("feed");
      const params = new URLSearchParams();
      const limit = getPageLimit(query);
      params.set("limit", String(limit));
      params.set("offset", String(pageOffset));
      if (query) {
        params.set("search", query);
      }
      if (feedFilter === "subscribed") {
        params.set("subscribed", "1");
      }
      const res = await apiFetch("/api/videos?" + params.toString());
      const data = await res.json();
      if (res.status === 401) {
        isFetching = false;
        lockApp(t("message_sign_in"));
        return;
      }
      const batch = data.videos || [];
      hasMore = Boolean(data.hasMore);
      videos = reset ? batch : videos.concat(batch);
      renderRecommendations(batch, !reset);
      updateSearchContext(query);
      updateNextUp();
      ui.loadMore.style.display = hasMore ? "inline-flex" : "none";
      if (!videos.length) {
        setOverlayState(false, false, false);
        updateStatus("status_empty");
        updateVideoMeta(null);
      }
      pageOffset += batch.length;
      isFetching = false;
    }

    async function fetchSearchResults(query, reset = false) {
      if (searchFetching) {
        return;
      }
      if (!currentUser) {
        return;
      }
      const trimmed = query.trim();
      if (!trimmed) {
        navigateTo("/", { replace: true });
        return;
      }
      searchFetching = true;
      if (reset) {
        searchOffset = 0;
        searchHasMore = true;
        searchQuery = trimmed;
        ui.searchGrid.innerHTML = t("status_loading");
        ui.searchEmpty.classList.add("hidden");
        ui.searchFallback.classList.add("hidden");
      }
      setPageView("search");
      ui.searchTitle.textContent = t("search_results") + " \"" + searchQuery + "\"";
      const params = new URLSearchParams();
      params.set("limit", String(searchLimit));
      params.set("offset", String(searchOffset));
      params.set("search", searchQuery);
      const res = await apiFetch("/api/videos?" + params.toString());
      const data = await res.json();
      if (!res.ok) {
        searchFetching = false;
        return;
      }
      const batch = data.videos || [];
      searchHasMore = Boolean(data.hasMore);
      renderVideoGrid(
        batch,
        ui.searchGrid,
        !reset,
        t("message_no_videos"),
        (video) => {
          openVideoPage(video);
        }
      );
      const searchLoadMoreWrap = ui.searchLoadMore.parentElement;
      if (reset && batch.length === 0) {
        ui.searchGrid.innerHTML = "";
        ui.searchEmpty.classList.remove("hidden");
        ui.searchFallback.classList.remove("hidden");
        await loadSearchFallback();
        ui.searchLoadMore.style.display = "none";
        if (searchLoadMoreWrap) {
          searchLoadMoreWrap.style.display = "none";
        }
      } else {
        ui.searchEmpty.classList.add("hidden");
        ui.searchFallback.classList.add("hidden");
        ui.searchLoadMore.style.display = searchHasMore ? "inline-flex" : "none";
        if (searchLoadMoreWrap) {
          searchLoadMoreWrap.style.display = "grid";
        }
      }
      searchOffset += batch.length;
      searchFetching = false;
    }

    async function playVideoById(videoId) {
      if (!videoId) {
        return;
      }
      const res = await apiFetch("/api/videos/" + videoId);
      if (res.status === 403) {
        navigateTo("/", { replace: true });
        setPageView("feed");
        updateStatus("status_limit_reached");
        return;
      }
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      if (!data || !data.video) {
        return;
      }
      videos = [data.video];
      currentIndex = 0;
      setPageView("watch");
      loadVideo(0);
    }

    async function playReportedVideo(report) {
      if (!report || !report.video_id) {
        return;
      }
      playVideoById(report.video_id);
    }

    async function refreshNotificationBadge() {
      if (!currentUser) {
        updateNotificationBadge(false);
        return;
      }
      const res = await apiFetch("/api/notifications");
      if (!res.ok) {
        updateNotificationBadge(false);
        return;
      }
      const data = await res.json();
      const hasUnread = data.notifications && data.notifications.some((note) => !note.read_at);
      updateNotificationBadge(hasUnread);
    }

    async function openWatch(videoId) {
      await playVideoById(videoId);
    }

    async function loadSearchFallback() {
      if (!currentUser) {
        return;
      }
      ui.searchFallbackRecommended.innerHTML = t("status_loading");
      ui.searchFallbackViral.innerHTML = t("status_loading");
      const [recRes, viralRes] = await Promise.all([
        apiFetch("/api/videos?limit=8&offset=0"),
        apiFetch("/api/viral?limit=8")
      ]);
      if (recRes.ok) {
        const recData = await recRes.json();
        renderVideoGrid(recData.videos || [], ui.searchFallbackRecommended, false, t("message_no_videos"), (video) => {
          openVideoPage(video);
        });
      } else {
        ui.searchFallbackRecommended.textContent = t("message_no_videos");
      }
      if (viralRes.ok) {
        const viralData = await viralRes.json();
        renderVideoGrid(viralData.videos || [], ui.searchFallbackViral, false, t("message_no_viral"), (video) => {
          openVideoPage(video);
        });
      } else {
        ui.searchFallbackViral.textContent = t("message_no_viral");
      }
    }

    async function fetchViral() {
      if (!currentUser) {
        return;
      }
      const res = await apiFetch("/api/viral?limit=8");
      const data = await res.json();
      if (!res.ok) {
        ui.viralGrid.textContent = t("message_fetch_viral_failed");
        return;
      }
      renderVideoGrid(data.videos || [], ui.viralGrid, false, t("message_no_viral"), (video) => {
        openVideoPage(video);
      });
    }

    async function sendRequest(event) {
      event.preventDefault();
      if (!currentUser) {
        lockApp(t("message_sign_in"));
        return;
      }
      if (!ui.requestReason || !ui.requestDetails || !ui.requestContact || !ui.requestMessage) {
        return;
      }
      const reason = ui.requestReason.value;
      const details = ui.requestDetails.value.trim();
      const contact = ui.requestContact.value.trim();
      const messageNode = ui.requestMessage;
      messageNode.textContent = "";
      if (!reason || !details || !contact) {
        messageNode.textContent = t("request_required");
        return;
      }
      const res = await apiFetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason, details, contact })
      });
      if (res.ok) {
        messageNode.textContent = t("request_success");
        ui.requestForm.reset();
        updateRequestFields(ui.requestReason.value);
      } else {
        messageNode.textContent = t("request_error");
      }
    }

    async function fetchChannels() {
      if (!currentUser) {
        return;
      }
      const params = new URLSearchParams();
      params.set("limit", "20");
      params.set("offset", "0");
      const res = await apiFetch("/api/channels?" + params.toString());
      const data = await res.json();
      renderChannels(data.channels || [], ui.channelList);
    }

    async function fetchChannelsPage(query, reset = false) {
      if (channelsFetching) {
        return;
      }
      channelsFetching = true;
      if (reset) {
        channelsOffset = 0;
        channelsHasMore = true;
        channelsQuery = query.trim();
        ui.channelsPageList.innerHTML = t("status_loading");
      }
      setPageView("channels");
      if (!currentUser) {
        ui.channelsPageList.textContent = t("message_sign_in");
        ui.channelsLoadMore.style.display = "none";
        channelsFetching = false;
        return;
      }
      const params = new URLSearchParams();
      params.set("limit", "24");
      params.set("offset", String(channelsOffset));
      if (channelsQuery) {
        params.set("search", channelsQuery);
      }
      const res = await apiFetch("/api/channels?" + params.toString());
      const data = await res.json();
      if (!res.ok) {
        channelsFetching = false;
        return;
      }
      const batch = data.channels || [];
      channelsHasMore = Boolean(data.hasMore);
      renderChannelsPage(batch, !reset);
      ui.channelsLoadMore.style.display = channelsHasMore ? "inline-flex" : "none";
      channelsOffset += batch.length;
      channelsFetching = false;
    }

    async function fetchSubscriptions() {
      if (!currentUser) {
        subscriptions = [];
        renderSubscriptions();
        return;
      }
      const res = await apiFetch("/api/subscriptions");
      const data = await res.json();
      subscriptions = data.subscriptions || [];
      renderSubscriptions();
    }

    async function initFirebase() {
      try {
        const res = await fetch(API_BASE + "/api/firebase-config");
        const config = await res.json();
        if (!res.ok) {
          ui.authMessage.textContent = config.error || t("message_auth_failed");
          lockApp(t("message_auth_required"));
          return;
        }
        firebase.initializeApp(config);
        firebaseAuth = firebase.auth();
        firebaseAuth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);
        firebaseAuth.onAuthStateChanged(async (user) => {
          firebaseUser = user;
          if (!user) {
            token = "";
            currentUser = null;
            updateAuthUI();
            renderSubscriptions();
            ui.verifyResend.style.display = "none";
            lockApp(t("message_sign_in"));
            return;
          }
          if (!user.emailVerified) {
            token = "";
            currentUser = null;
            updateAuthUI();
            ui.verifyResend.style.display = "inline-flex";
            lockApp(t("message_verify_needed"));
            return;
          }
          ui.verifyResend.style.display = "none";
          token = await user.getIdToken();
          await fetchMe();
          await fetchChannels();
          await fetchTopics();
          await fetchViral();
          await fetchVideos("", true);
        });
      } catch (err) {
        ui.authMessage.textContent = t("message_auth_failed");
        lockApp(t("message_auth_required"));
      }
    }

    async function resendVerification() {
      if (!firebaseUser) {
        ui.authMessage.textContent = t("message_sign_in_first");
        return;
      }
      if (firebaseUser.emailVerified) {
        ui.authMessage.textContent = t("message_email_verified");
        return;
      }
      try {
        await firebaseUser.sendEmailVerification();
        ui.authMessage.textContent = t("message_verification_sent");
      } catch (err) {
        ui.authMessage.textContent = err.message || t("message_verification_failed");
      }
    }

    async function sendPasswordReset() {
      ui.authMessage.textContent = "";
      if (!firebaseAuth) {
        ui.authMessage.textContent = t("message_auth_failed");
        return;
      }
      const emailInput = document.getElementById("login-email").value.trim();
      const email = emailInput || (firebaseUser && firebaseUser.email) || "";
      if (!email) {
        ui.authMessage.textContent = t("message_email_required");
        return;
      }
      try {
        await firebaseAuth.sendPasswordResetEmail(email);
        ui.authMessage.textContent = t("message_reset_sent");
      } catch (err) {
        ui.authMessage.textContent = err.message || t("message_reset_failed");
      }
    }

    function openSignout() {
      if (!firebaseUser) {
        return;
      }
      ui.signoutMessage.textContent = "";
      ui.signoutForm.reset();
      openModal(ui.signoutModal);
    }

    async function confirmSignout(event) {
      event.preventDefault();
      ui.signoutMessage.textContent = "";
      if (!firebaseUser) {
        ui.signoutMessage.textContent = t("message_sign_in_first");
        return;
      }
      const password = document.getElementById("signout-password").value;
      if (!password) {
        ui.signoutMessage.textContent = t("message_password_required");
        return;
      }
      try {
        const credential = firebase.auth.EmailAuthProvider.credential(firebaseUser.email, password);
        await firebaseUser.reauthenticateWithCredential(credential);
        await firebaseAuth.signOut();
        closeModal(ui.signoutModal);
      } catch (err) {
        ui.signoutMessage.textContent = err.message || t("message_password_check_failed");
      }
    }

    async function fetchMe() {
      if (!token) {
        currentUser = null;
        updateAuthUI();
        fetchSubscriptions();
        updateNotificationBadge(false);
        return;
      }
      const res = await apiFetch("/api/me");
      if (!res.ok) {
        token = "";
        currentUser = null;
        updateAuthUI();
        fetchSubscriptions();
        updateNotificationBadge(false);
        lockApp(t("message_sign_in"));
        return;
      }
      const data = await res.json();
      currentUser = data.user;
      updateAuthUI();
      fetchSubscriptions();
      unlockApp();
      handleRoute();
      refreshNotificationBadge();
    }

    function updateAuthUI() {
      const isAdmin = currentUser && currentUser.role === "admin";
      ui.authLogout.style.display = currentUser ? "inline-flex" : "none";
      ui.authOpen.style.display = currentUser ? "none" : "inline-flex";
      if (!currentUser) {
        stopPlayback();
      }
      ui.uploadOpen.style.display =
        currentUser && (currentUser.role === "artist" || currentUser.role === "admin")
          ? "inline-flex"
          : "none";
      ui.adminOpen.style.display = isAdmin ? "inline-flex" : "none";
      const isAdminView =
        document.body.getAttribute("data-view") &&
        document.body.getAttribute("data-view").startsWith("admin");
      ui.adminNav.style.display = isAdmin && isAdminView ? "flex" : "none";
      ui.adminVideosOpen.style.display = isAdmin ? "inline-flex" : "none";
      ui.studioOpen.style.display = currentUser ? "inline-flex" : "none";
      ui.settingsBar.style.display = "inline-flex";
      ui.settingsOpen.style.display = "inline-flex";
      ui.notificationsOpen.style.display = currentUser ? "inline-flex" : "none";
      ui.uploadMetadata.style.display =
        currentUser && (currentUser.role === "admin" || currentUser.role === "artist")
          ? "grid"
          : "none";
      const displayName =
        (currentUser && (currentUser.display_name || currentUser.email)) ||
        (firebaseUser && firebaseUser.email) ||
        "Guest";
      const avatarLetter = (displayName && displayName[0]) || "K";
      const planLabel = currentUser
        ? (currentUser.role || "user") + " • " + (currentUser.plan || "free")
        : "Guest mode";
      if (ui.accountName) {
        ui.accountName.textContent = displayName;
      }
      if (ui.accountPlan) {
        ui.accountPlan.textContent = planLabel;
      }
      if (ui.accountAvatar) {
        ui.accountAvatar.textContent = avatarLetter.toUpperCase();
      }
      if (ui.heroIdentity) {
        ui.heroIdentity.textContent = currentUser ? "Signed in as " + displayName : "Guest mode";
      }
      if (!currentUser && feedFilter === "subscribed") {
        feedFilter = "all";
        ui.filterSubscribed.classList.remove("active");
      }
      updateHeartButton();
    }

    const LOGIN_ATTEMPT_KEY = "loginAttempts";
    const LOGIN_ATTEMPT_RESET_MS = 15 * 60 * 1000;

    function getLoginAttempts() {
      const raw = localStorage.getItem(LOGIN_ATTEMPT_KEY);
      if (!raw) {
        return { count: 0, ts: 0 };
      }
      try {
        const data = JSON.parse(raw);
        if (!data.ts || Date.now() - data.ts > LOGIN_ATTEMPT_RESET_MS) {
          return { count: 0, ts: 0 };
        }
        return { count: data.count || 0, ts: data.ts };
      } catch (err) {
        return { count: 0, ts: 0 };
      }
    }

    function bumpLoginAttempts() {
      const current = getLoginAttempts();
      const next = { count: (current.count || 0) + 1, ts: Date.now() };
      localStorage.setItem(LOGIN_ATTEMPT_KEY, JSON.stringify(next));
      return next.count;
    }

    function resetLoginAttempts() {
      localStorage.removeItem(LOGIN_ATTEMPT_KEY);
    }

    async function handleLogin(event) {
      event.preventDefault();
      ui.authMessage.textContent = "";
      if (!firebaseAuth) {
        ui.authMessage.textContent = t("message_auth_failed");
        return;
      }
      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value;
      try {
        const cred = await firebaseAuth.signInWithEmailAndPassword(email, password);
        resetLoginAttempts();
        if (!cred.user.emailVerified) {
          ui.authMessage.textContent = t("message_verification_needed");
          await cred.user.sendEmailVerification();
          return;
        }
      } catch (err) {
        const attempts = bumpLoginAttempts();
        if (err && err.code === "auth/too-many-requests" && attempts < 14) {
          ui.authMessage.textContent = t("message_login_failed");
          return;
        }
        ui.authMessage.textContent = err.message || t("message_login_failed");
      }
    }

    async function handleRegister(event) {
      event.preventDefault();
      ui.authMessage.textContent = "";
      if (!firebaseAuth) {
        ui.authMessage.textContent = t("message_auth_failed");
        return;
      }
      const email = document.getElementById("register-email").value.trim();
      const password = document.getElementById("register-password").value;
      try {
        const cred = await firebaseAuth.createUserWithEmailAndPassword(email, password);
        await cred.user.sendEmailVerification();
        ui.authMessage.textContent = t("message_verification_prompt");
      } catch (err) {
        ui.authMessage.textContent = err.message || t("message_register_failed");
      }
    }

    async function handleUpload(event) {
      event.preventDefault();
      ui.uploadMessage.textContent = "";
      const youtubeUrl = document.getElementById("upload-url").value.trim();
      if (!youtubeUrl) {
        ui.uploadMessage.textContent = t("message_youTube_required");
        return;
      }
      const payload = { youtubeUrl };
      if (currentUser && (currentUser.role === "admin" || currentUser.role === "artist")) {
        const languageSelect = document.getElementById("upload-language");
        const selectedLanguages = Array.from(languageSelect.selectedOptions).map((option) => option.value);
        const language = selectedLanguages[0] || "unspecified";
        const religionSelect = document.getElementById("upload-religion");
        const religionDetail = document.getElementById("upload-religion-detail");
        const religion = religionSelect ? religionSelect.value : "none";
        const religion_detail = religionDetail ? religionDetail.value.trim() : "";
        const topics = ui.uploadTopics.value
          .split(/[|,]/g)
          .map((topic) => topic.trim())
          .filter(Boolean);
        payload.language = language;
        payload.languages = selectedLanguages;
        payload.religion = religion;
        payload.religion_detail = religion_detail;
        payload.topics = topics;
      }
      const res = await apiFetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (!res.ok) {
        ui.uploadMessage.textContent = data.error || t("message_add_video_failed");
        return;
      }
      ui.uploadForm.reset();
      closeModal(ui.uploadModal);
      await fetchVideos(ui.searchInput.value.trim());
      await fetchChannels();
      await fetchViral();
      await fetchTopics();
      ui.uploadMessage.textContent = "";
    }

    async function openAdmin() {
      ui.adminList.innerHTML = t("status_loading");
      ui.adminReports.innerHTML = t("status_loading");
      ui.adminStats.innerHTML = t("status_loading");
      ui.adminChannelsList.innerHTML = t("status_loading");
      ui.adminVideosList.innerHTML = t("status_loading");
      const [usersRes, reportsRes, statsRes, videosRes] = await Promise.all([
        apiFetch("/api/users?limit=50&offset=0"),
        apiFetch("/api/reports"),
        apiFetch("/api/stats"),
        apiFetch("/api/videos/manage?limit=40&offset=0")
      ]);
      const data = await usersRes.json();
      const videosData = await videosRes.json();
      ui.adminList.innerHTML = "";
      const statsData = statsRes.ok ? await statsRes.json() : null;
      ui.adminStats.innerHTML = "";
      renderAdminStats(statsData, ui.adminStats);
      const users = data.users || [];
      adminUsersData = users;
      adminChannelsData = users.filter((user) => user.role === "artist");
      adminVideosData = videosData.videos || [];
      renderAdminUsers(adminUsersData);
      renderAdminChannels(adminChannelsData);
      renderAdminVideos(adminVideosData);
      const reportsData = reportsRes.ok ? await reportsRes.json() : { reports: [] };
      if (!reportsRes.ok) {
        ui.adminReports.textContent = t("message_reports_failed");
      } else {
        renderAdminReports(reportsData.reports || [], ui.adminReports);
      }
      openModal(ui.adminModal);
      setAdminTab("overview");
    }

    function renderAdminStats(statsData, container) {
      if (statsData && statsData.totals) {
        const summary = document.createElement("div");
        summary.className = "card-meta";
        summary.textContent =
          statsData.totals.videos +
          " " +
          t("label_videos") +
          " · " +
          statsData.totals.views +
          " " +
          t("label_views") +
          " · " +
          statsData.totals.artists +
          " " +
          t("label_artists");
        container.appendChild(summary);
        (statsData.artists || []).forEach((artist) => {
          const row = document.createElement("div");
          row.className = "channel";
          row.innerHTML =
            "<span class=\"avatar\" aria-hidden=\"true\"></span>" +
            "<div><div class=\"channel-name\">" +
            escapeHtml(artist.email) +
            "</div><div class=\"card-meta\">" +
            escapeHtml(artist.videos) +
            " " +
            t("label_videos") +
            " · " +
            escapeHtml(artist.views) +
            " " +
            t("label_views") +
            "</div></div>";
          container.appendChild(row);
        });
      } else {
        container.textContent = t("message_stats_unavailable");
      }
    }

    function renderAdminUsers(list, container = ui.adminList, append = false) {
      if (!append) {
        container.innerHTML = "";
      }
      list.forEach((user) => {
        const row = document.createElement("div");
        row.className = "channel";
        let buttonLabel = user.role;
        if (user.role === "user") {
          buttonLabel = t("admin_make_artist");
        } else if (user.role === "artist") {
          buttonLabel = t("admin_make_user");
        }
        const button = document.createElement("button");
        button.type = "button";
        button.className = "ghost";
        button.textContent = buttonLabel;
        button.disabled = user.role === "admin";
        button.addEventListener("click", async () => {
          const nextRole = user.role === "artist" ? "user" : "artist";
          const grantRes = await apiFetch("/api/admin/role", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id, role: nextRole })
          });
          if (grantRes.ok) {
            refreshAdminView();
          }
        });
        row.innerHTML =
          "<span class=\"avatar\" aria-hidden=\"true\"></span>" +
          "<div><div class=\"channel-name\">" +
          escapeHtml(user.email) +
          "</div><div class=\"card-meta\">" +
          escapeHtml(user.role) +
          " · " +
          (user.firebase_uid ? "UID: " + escapeHtml(user.firebase_uid) : "UID: -") +
          " · " +
          t("label_plan") +
          " " +
          escapeHtml(user.plan || "free") +
          "</div></div>";
        const planButton = document.createElement("button");
        planButton.type = "button";
        planButton.className = "pill";
        planButton.textContent =
          (user.plan || "free") === "pro" ? t("admin_set_free") : t("admin_set_pro");
        planButton.addEventListener("click", async () => {
          const nextPlan = (user.plan || "free") === "pro" ? "free" : "pro";
          const planRes = await apiFetch("/api/admin/plan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id, plan: nextPlan })
          });
          if (planRes.ok) {
            refreshAdminView();
          }
        });
        row.appendChild(button);
        row.appendChild(planButton);
        container.appendChild(row);
      });
    }

    function renderAdminChannels(list, container = ui.adminChannelsList, append = false) {
      if (!append) {
        container.innerHTML = "";
      }
      list.forEach((user) => {
        const row = document.createElement("div");
        row.className = "channel";
        row.innerHTML =
          "<span class=\"avatar\" aria-hidden=\"true\"></span>" +
          "<div><div class=\"channel-name\">" +
          escapeHtml(user.display_name || user.email) +
          "</div><div class=\"card-meta\">" +
          escapeHtml(user.email) +
          "</div></div>";
        setAvatar(row.querySelector(".avatar"), user.avatar_url);
        const actions = document.createElement("div");
        actions.className = "channel-actions";
        const revoke = document.createElement("button");
        revoke.type = "button";
        revoke.className = "ghost";
        revoke.textContent = t("admin_make_user");
        revoke.addEventListener("click", async () => {
          const res = await apiFetch("/api/admin/role", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user.id, role: "user" })
          });
          if (res.ok) {
            refreshAdminView();
          }
        });
        const viewVideos = document.createElement("button");
        viewVideos.type = "button";
        viewVideos.className = "pill";
        viewVideos.textContent = t("admin_view_videos");
        viewVideos.addEventListener("click", async () => {
          navigateTo("/admin/videos?owner=" + user.id);
        });
        actions.appendChild(viewVideos);
        actions.appendChild(revoke);
        row.appendChild(actions);
        container.appendChild(row);
      });
    }

    function renderAdminVideos(list) {
      ui.adminVideosList.innerHTML = "";
      list.forEach((video) => {
        const row = document.createElement("div");
        row.className = "channel";
        const editor = document.createElement("div");
        editor.className = "form-grid";
        editor.style.minWidth = "220px";
        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.value = video.title || "";
        titleInput.placeholder = t("label_untitled");
        const topicsInput = document.createElement("input");
        topicsInput.type = "text";
        let parsedTopics = [];
        if (Array.isArray(video.topics)) {
          parsedTopics = video.topics;
        } else {
          try {
            parsedTopics = video.topics ? JSON.parse(video.topics) : [];
          } catch (err) {
            parsedTopics = [];
          }
        }
        topicsInput.value = parsedTopics.join(", ");
        topicsInput.placeholder = t("upload_topics_placeholder");
        const languageInput = document.createElement("input");
        languageInput.type = "text";
        languageInput.value = (video.language || "");
        languageInput.placeholder = t("admin_video_language");
        editor.appendChild(titleInput);
        editor.appendChild(topicsInput);
        editor.appendChild(languageInput);
        row.innerHTML =
          "<div><div class=\"channel-name\">" +
          escapeHtml(video.title) +
          "</div><div class=\"card-meta\">" +
          escapeHtml(video.channel || "") +
          " · " +
          escapeHtml(video.views || 0) +
          " " +
          t("label_views") +
          "</div></div>";
        const actions = document.createElement("div");
        actions.className = "channel-actions";
        const saveBtn = document.createElement("button");
        saveBtn.type = "button";
        saveBtn.className = "pill";
        saveBtn.textContent = t("action_save");
        saveBtn.addEventListener("click", async () => {
          const topics = topicsInput.value
            .split(/[|,]/g)
            .map((topic) => topic.trim())
            .filter(Boolean);
          const language = languageInput.value.trim().toLowerCase();
          const res = await apiFetch("/api/videos/" + video.id + "/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: titleInput.value.trim(), language, topics })
          });
          if (res.ok) {
            refreshAdminView();
          }
        });
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "ghost";
        delBtn.textContent = t("action_delete");
        delBtn.addEventListener("click", async () => {
          const res = await apiFetch("/api/videos/" + video.id, { method: "DELETE" });
          if (res.ok) {
            refreshAdminView();
          }
        });
        actions.appendChild(saveBtn);
        actions.appendChild(delBtn);
        row.appendChild(editor);
        row.appendChild(actions);
        ui.adminVideosList.appendChild(row);
      });
    }

    function renderAdminVideosPage(list, append = false) {
      if (!append) {
        ui.adminVideosPageList.innerHTML = "";
      }
      if (!list.length && !append) {
        ui.adminVideosPageList.textContent = t("message_no_videos");
        return;
      }
      list.forEach((video) => {
        const row = document.createElement("div");
        row.className = "channel";
        const editor = document.createElement("div");
        editor.className = "form-grid";
        editor.style.minWidth = "220px";
        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.value = video.title || "";
        titleInput.placeholder = t("label_untitled");
        const topicsInput = document.createElement("input");
        topicsInput.type = "text";
        let parsedTopics = [];
        if (Array.isArray(video.topics)) {
          parsedTopics = video.topics;
        } else {
          try {
            parsedTopics = video.topics ? JSON.parse(video.topics) : [];
          } catch (err) {
            parsedTopics = [];
          }
        }
        topicsInput.value = parsedTopics.join(", ");
        topicsInput.placeholder = t("upload_topics_placeholder");
        const languageInput = document.createElement("input");
        languageInput.type = "text";
        languageInput.value = (video.language || "");
        languageInput.placeholder = t("admin_video_language");
        editor.appendChild(titleInput);
        editor.appendChild(topicsInput);
        editor.appendChild(languageInput);
        row.innerHTML =
          "<div><div class=\"channel-name\">" +
          escapeHtml(video.title) +
          "</div><div class=\"card-meta\">" +
          escapeHtml(video.channel || "") +
          " · " +
          escapeHtml(video.views || 0) +
          " " +
          t("label_views") +
          "</div></div>";
        const actions = document.createElement("div");
        actions.className = "channel-actions";
        const saveBtn = document.createElement("button");
        saveBtn.type = "button";
        saveBtn.className = "pill";
        saveBtn.textContent = t("action_save");
        saveBtn.addEventListener("click", async () => {
          const topics = topicsInput.value
            .split(/[|,]/g)
            .map((topic) => topic.trim())
            .filter(Boolean);
          const language = languageInput.value.trim().toLowerCase();
          const res = await apiFetch("/api/videos/" + video.id + "/update", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title: titleInput.value.trim(), language, topics })
          });
          if (res.ok) {
            fetchAdminVideosPage(adminVideosQuery, true);
          }
        });
        const delBtn = document.createElement("button");
        delBtn.type = "button";
        delBtn.className = "ghost";
        delBtn.textContent = t("action_delete");
        delBtn.addEventListener("click", async () => {
          const res = await apiFetch("/api/videos/" + video.id, { method: "DELETE" });
          if (res.ok) {
            fetchAdminVideosPage(adminVideosQuery, true);
          }
        });
        actions.appendChild(saveBtn);
        actions.appendChild(delBtn);
        row.appendChild(editor);
        row.appendChild(actions);
        ui.adminVideosPageList.appendChild(row);
      });
    }

    function renderAdminReports(reports, container) {
      container.innerHTML = "";
      if (!reports.length) {
        container.textContent = t("message_reports_empty");
        return;
      }
      reports.forEach((report) => {
        const row = document.createElement("div");
        row.className = "channel";
        const avatar = document.createElement("span");
        avatar.className = "avatar";
        avatar.setAttribute("aria-hidden", "true");
        const info = document.createElement("div");
        const title = document.createElement("div");
        title.className = "channel-name";
        title.textContent = report.video_title;
        const meta = document.createElement("div");
        meta.className = "card-meta";
        meta.textContent =
          t("label_reported_by") + " " + report.reporter + " · " + report.reason + " · " + report.status;
        info.appendChild(title);
        info.appendChild(meta);
        const actions = document.createElement("div");
        actions.className = "channel-actions";
        const viewBtn = document.createElement("button");
        viewBtn.type = "button";
        viewBtn.className = "ghost";
        viewBtn.textContent = t("control_play");
        viewBtn.addEventListener("click", () => playReportedVideo(report));
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "ghost";
        deleteBtn.textContent = t("action_delete");
        deleteBtn.addEventListener("click", async () => {
          const res = await apiFetch("/api/videos/" + report.video_id, { method: "DELETE" });
          if (res.ok) {
            refreshAdminView();
          }
        });
        const input = document.createElement("input");
        input.type = "text";
        input.className = "report-input";
        input.placeholder = t("admin_report_message_placeholder");
        input.disabled = report.status === "resolved";
        const button = document.createElement("button");
        button.type = "button";
        button.className = "ghost";
        button.textContent = report.status === "resolved" ? t("label_resolved") : t("action_resolve");
        button.disabled = report.status === "resolved";
        button.addEventListener("click", async () => {
          const res = await apiFetch("/api/reports/" + report.id + "/resolve", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: input.value.trim() })
          });
          if (res.ok) {
            refreshAdminView();
          }
        });
        actions.appendChild(viewBtn);
        actions.appendChild(deleteBtn);
        actions.appendChild(input);
        actions.appendChild(button);
        row.appendChild(avatar);
        row.appendChild(info);
        row.appendChild(actions);
        container.appendChild(row);
      });
    }

    async function fetchAdminVideosPage(query, reset = false) {
      if (adminVideosFetching || !currentUser || currentUser.role !== "admin") {
        return;
      }
      adminVideosFetching = true;
      if (reset) {
        adminVideosOffset = 0;
        adminVideosHasMore = true;
        adminVideosQuery = query.trim();
        ui.adminVideosPageList.innerHTML = t("status_loading");
      }
      setPageView("admin-videos");
      const params = new URLSearchParams();
      params.set("limit", "40");
      params.set("offset", String(adminVideosOffset));
      if (adminVideosQuery) {
        params.set("search", adminVideosQuery);
      }
      if (adminVideosOwnerId) {
        params.set("ownerId", adminVideosOwnerId);
      }
      const res = await apiFetch("/api/videos/manage?" + params.toString());
      const data = await res.json();
      if (!res.ok) {
        adminVideosFetching = false;
        return;
      }
      const batch = data.videos || [];
      adminVideosHasMore = Boolean(data.hasMore);
      renderAdminVideosPage(batch, !reset);
      ui.adminVideosLoadMore.style.display = adminVideosHasMore ? "inline-flex" : "none";
      adminVideosOffset += batch.length;
      adminVideosFetching = false;
    }

    async function fetchAdminOverviewPage() {
      if (!currentUser || currentUser.role !== "admin") {
        return;
      }
      ui.adminOverviewPageList.innerHTML = t("status_loading");
      setPageView("admin-overview");
      const res = await apiFetch("/api/stats");
      if (!res.ok) {
        ui.adminOverviewPageList.textContent = t("message_stats_unavailable");
        return;
      }
      const data = await res.json();
      ui.adminOverviewPageList.innerHTML = "";
      renderAdminStats(data, ui.adminOverviewPageList);
    }

    async function fetchAdminUsersPage(query, reset = false) {
      if (adminUsersPageFetching || !currentUser || currentUser.role !== "admin") {
        return;
      }
      adminUsersPageFetching = true;
      if (reset) {
        adminUsersPageOffset = 0;
        adminUsersPageHasMore = true;
        adminUsersPageQuery = query.trim();
        ui.adminUsersPageList.innerHTML = t("status_loading");
      }
      setPageView("admin-users");
      const params = new URLSearchParams();
      params.set("limit", "40");
      params.set("offset", String(adminUsersPageOffset));
      if (adminUsersPageQuery) {
        params.set("search", adminUsersPageQuery);
      }
      const res = await apiFetch("/api/users?" + params.toString());
      const data = await res.json();
      if (!res.ok) {
        adminUsersPageFetching = false;
        return;
      }
      const batch = data.users || [];
      adminUsersPageHasMore = Boolean(data.hasMore);
      renderAdminUsers(batch, ui.adminUsersPageList, !reset);
      ui.adminUsersLoadMore.style.display = adminUsersPageHasMore ? "inline-flex" : "none";
      adminUsersPageOffset += batch.length;
      adminUsersPageFetching = false;
    }

    async function fetchAdminChannelsPage(query, reset = false) {
      if (adminChannelsPageFetching || !currentUser || currentUser.role !== "admin") {
        return;
      }
      adminChannelsPageFetching = true;
      if (reset) {
        adminChannelsPageOffset = 0;
        adminChannelsPageHasMore = true;
        adminChannelsPageQuery = query.trim();
        ui.adminChannelsPageList.innerHTML = t("status_loading");
      }
      setPageView("admin-channels");
      const params = new URLSearchParams();
      params.set("limit", "40");
      params.set("offset", String(adminChannelsPageOffset));
      params.set("role", "artist");
      if (adminChannelsPageQuery) {
        params.set("search", adminChannelsPageQuery);
      }
      const res = await apiFetch("/api/users?" + params.toString());
      const data = await res.json();
      if (!res.ok) {
        adminChannelsPageFetching = false;
        return;
      }
      const batch = data.users || [];
      adminChannelsPageHasMore = Boolean(data.hasMore);
      renderAdminChannels(batch, ui.adminChannelsPageList, !reset);
      ui.adminChannelsLoadMore.style.display = adminChannelsPageHasMore ? "inline-flex" : "none";
      adminChannelsPageOffset += batch.length;
      adminChannelsPageFetching = false;
    }

    async function fetchAdminReportsPage() {
      if (!currentUser || currentUser.role !== "admin") {
        return;
      }
      ui.adminReportsPageList.innerHTML = t("status_loading");
      setPageView("admin-reports");
      const res = await apiFetch("/api/reports");
      if (!res.ok) {
        ui.adminReportsPageList.textContent = t("message_reports_failed");
        return;
      }
      const data = await res.json();
      renderAdminReports(data.reports || [], ui.adminReportsPageList);
    }

    function openAdminImportsPage() {
      if (!currentUser || currentUser.role !== "admin") {
        return;
      }
      setPageView("admin-imports");
    }

    function refreshAdminView() {
      const view = document.body.getAttribute("data-view");
      if (view === "admin-overview") {
        fetchAdminOverviewPage();
        return;
      }
      if (view === "admin-users") {
        fetchAdminUsersPage(adminUsersPageQuery, true);
        return;
      }
      if (view === "admin-channels") {
        fetchAdminChannelsPage(adminChannelsPageQuery, true);
        return;
      }
      if (view === "admin-videos") {
        fetchAdminVideosPage(adminVideosQuery, true);
        return;
      }
      if (view === "admin-reports") {
        fetchAdminReportsPage();
        return;
      }
      if (view === "admin-imports") {
        openAdminImportsPage();
        return;
      }
      if (ui.adminModal.classList.contains("active")) {
        openAdmin();
      }
    }

    function setAdminTab(tab) {
      ui.adminTabs.forEach((button) => {
        button.classList.toggle("active", button.dataset.adminTab === tab);
      });
      ui.adminOverview.classList.toggle("hidden", tab !== "overview");
      ui.adminUsers.classList.toggle("hidden", tab !== "users");
      ui.adminChannels.classList.toggle("hidden", tab !== "channels");
      ui.adminVideos.classList.toggle("hidden", tab !== "videos");
      ui.adminReportsPanel.classList.toggle("hidden", tab !== "reports");
      ui.adminImports.classList.toggle("hidden", tab !== "imports");
    }

    async function fetchAdminUsersRemote(query, role) {
      if (!currentUser || currentUser.role !== "admin") {
        return;
      }
      const params = new URLSearchParams();
      params.set("limit", "50");
      params.set("offset", "0");
      if (query) {
        params.set("search", query);
      }
      if (role) {
        params.set("role", role);
      }
      const res = await apiFetch("/api/users?" + params.toString());
      const data = await res.json();
      if (!res.ok) {
        return;
      }
      if (role === "artist") {
        adminChannelsData = data.users || [];
        renderAdminChannels(adminChannelsData);
      } else {
        adminUsersData = data.users || [];
        renderAdminUsers(adminUsersData);
      }
    }

    async function fetchAdminVideosRemote(query) {
      if (!currentUser || currentUser.role !== "admin") {
        return;
      }
      const params = new URLSearchParams();
      params.set("limit", "40");
      params.set("offset", "0");
      if (query) {
        params.set("search", query);
      }
      const res = await apiFetch("/api/videos/manage?" + params.toString());
      const data = await res.json();
      if (!res.ok) {
        return;
      }
      adminVideosData = data.videos || [];
      renderAdminVideos(adminVideosData);
    }

    async function importCsv(elements = {}) {
      const csvInput = elements.csv || ui.adminCsv;
      const message = elements.message || ui.adminImportMessage;
      message.textContent = "";
      const file = csvInput.files[0];
      if (!file) {
        message.textContent = t("message_select_csv");
        return;
      }
      const text = await file.text();
      const res = await apiFetch("/api/admin/import-csv", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csv: text })
      });
      const data = await res.json();
      if (!res.ok) {
        message.textContent = data.error || t("message_import_failed");
        return;
      }
      message.textContent =
        t("message_imported") + " " + data.inserted + ", " + t("message_skipped") + " " + data.skipped.length;
      csvInput.value = "";
      fetchVideos(ui.searchInput.value.trim(), true);
    }

    async function importSql(elements = {}) {
      const sqlInput = elements.sql || ui.adminSql;
      const message = elements.message || ui.adminImportMessage;
      message.textContent = "";
      const sql = sqlInput.value.trim();
      if (!sql) {
        message.textContent = t("message_paste_sql");
        return;
      }
      const res = await apiFetch("/api/admin/import-sql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sql })
      });
      const data = await res.json();
      if (!res.ok) {
        message.textContent = data.error || t("message_import_failed");
        return;
      }
      message.textContent =
        t("message_imported") + " " + data.inserted + ", " + t("message_skipped") + " " + data.skipped.length;
      sqlInput.value = "";
      fetchVideos(ui.searchInput.value.trim(), true);
    }

    async function exportSql(messageTarget = ui.adminImportMessage) {
      const res = await apiFetch("/api/admin/export-sql");
      if (!res.ok) {
        messageTarget.textContent = t("message_export_failed");
        return;
      }
      const text = await res.text();
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "videos.sql";
      link.click();
      URL.revokeObjectURL(url);
    }

    async function openStudio() {
      ui.statsSummary.textContent = t("message_loading_stats");
      ui.artistStats.innerHTML = "";
      ui.manageList.innerHTML = "";
      ui.profileMessage.textContent = "";
      if (currentUser && (currentUser.role === "artist" || currentUser.role === "admin")) {
        ui.profileForm.style.display = "grid";
        await loadProfile();
      } else {
        ui.profileForm.style.display = "none";
      }
      const statsRes = await apiFetch("/api/stats");
      const statsData = await statsRes.json();
      if (statsRes.ok && statsData.totals) {
        if (statsData.totals.users) {
          ui.statsSummary.textContent =
            statsData.totals.videos +
            " " +
            t("label_videos") +
            " · " +
            statsData.totals.views +
            " " +
            t("label_views") +
            " · " +
            statsData.totals.artists +
            " " +
            t("label_artists");
        } else {
          ui.statsSummary.textContent =
            statsData.totals.videos +
            " " +
            t("label_videos") +
            " · " +
            statsData.totals.views +
            " " +
            t("label_views");
        }
      } else {
        ui.statsSummary.textContent = t("message_stats_unavailable");
      }

      if (statsData.artists && statsData.artists.length) {
        const title = document.createElement("div");
        title.className = "card-meta";
        title.textContent = t("label_artist_stats");
        ui.artistStats.appendChild(title);
        statsData.artists.forEach((artist) => {
          const row = document.createElement("div");
          row.className = "channel";
          row.innerHTML =
            "<span class=\"avatar\" aria-hidden=\"true\"></span>" +
            "<div><div class=\"channel-name\">" +
            escapeHtml(artist.email) +
            "</div><div class=\"card-meta\">" +
            escapeHtml(artist.videos) +
            " " +
            t("label_videos") +
            " · " +
            escapeHtml(artist.views) +
            " " +
            t("label_views") +
            "</div></div>";
          ui.artistStats.appendChild(row);
        });
      }

      const videosRes = await apiFetch("/api/videos/manage");
      const videosData = await videosRes.json();
      if (videosRes.ok && videosData.videos && videosData.videos.length) {
        const title = document.createElement("div");
        title.className = "card-meta";
        title.textContent =
          currentUser && currentUser.role === "admin" ? t("label_all_videos") : t("label_your_videos");
        ui.manageList.appendChild(title);
        videosData.videos.forEach((video) => {
          const row = document.createElement("div");
          row.className = "channel";
          const button = document.createElement("button");
          button.type = "button";
          button.className = "ghost";
          button.textContent = t("action_delete");
          button.addEventListener("click", async () => {
            const res = await apiFetch("/api/videos/" + video.id, { method: "DELETE" });
            if (res.ok) {
              openStudio();
              fetchVideos(ui.searchInput.value.trim(), true);
            }
          });
          row.innerHTML =
            "<span class=\"avatar\" aria-hidden=\"true\"></span>" +
            "<div><div class=\"channel-name\">" +
            escapeHtml(video.title) +
            "</div><div class=\"card-meta\">" +
            escapeHtml(video.channel || "") +
            " · " +
            escapeHtml(video.views || 0) +
            " " +
            t("label_views") +
            "</div></div>";
          row.appendChild(button);
          ui.manageList.appendChild(row);
        });
      } else {
        ui.manageList.textContent = t("message_no_videos");
      }
      openModal(ui.studioModal);
    }

    async function loadProfile() {
      const res = await apiFetch("/api/profile");
      const data = await res.json();
      if (!res.ok) {
        ui.profileMessage.textContent = data.error || t("message_profile_load_failed");
        return;
      }
      ui.profileName.value = data.profile?.display_name || "";
      ui.profileSlogan.value = data.profile?.slogan || "";
      ui.profileAvatar.value = data.profile?.avatar_url || "";
    }

    async function saveProfile(event) {
      event.preventDefault();
      ui.profileMessage.textContent = "";
      const displayName = ui.profileName.value.trim();
      const slogan = ui.profileSlogan.value.trim();
      const avatarUrl = ui.profileAvatar.value.trim();
      const res = await apiFetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ displayName, slogan, avatarUrl })
      });
      const data = await res.json();
      if (!res.ok) {
        ui.profileMessage.textContent = data.error || t("message_profile_save_failed");
        return;
      }
      ui.profileMessage.textContent = t("message_profile_saved");
      fetchChannels();
    }

    async function openSettings() {
      if (!currentUser) {
        lockApp(t("message_sign_in"));
        return;
      }
      ui.settingsAuthMessage.textContent = "";
      ui.settingsAuthForm.reset();
      openModal(ui.settingsAuthModal);
    }

    async function openSettingsForm() {
      ui.settingsMessage.textContent = "";
      ui.settingsForm.reset();
      ui.historyList.innerHTML = t("status_loading");
      settingsSelectedTopics = new Set();
      settingsSelectedChannels = new Set();
      settingsSelectedReligions = new Set();
      const res = await apiFetch("/api/settings");
      const data = await res.json();
      if (res.ok && data.settings) {
        const languages = new Set(data.settings.allowed_languages || []);
        const topics = new Set(data.settings.allowed_topics || []);
        const channels = new Set((data.settings.allowed_channels || []).map(String));
        const religions = new Set((data.settings.allowed_religions || []).map((rel) => String(rel).toLowerCase()));
        const mode = data.settings.topic_mode === "block" ? "block" : data.settings.topic_mode === "off" ? "off" : "allow";
        const channelMode =
          data.settings.channel_mode === "block"
            ? "block"
            : data.settings.channel_mode === "off"
            ? "off"
            : "allow";
        const religionMode =
          data.settings.religion_mode === "block"
            ? "block"
            : data.settings.religion_mode === "off"
            ? "off"
            : "allow";
        document.querySelectorAll("input[name='topic-mode']").forEach((input) => {
          input.checked = input.value === mode;
        });
        document.querySelectorAll("input[name='channel-mode']").forEach((input) => {
          input.checked = input.value === channelMode;
        });
        document.querySelectorAll("input[name='religion-mode']").forEach((input) => {
          input.checked = input.value === religionMode;
        });
        document.querySelectorAll("input[name='settings-language']").forEach((input) => {
          input.checked = languages.has(input.value);
        });
        settingsSelectedTopics = topics;
        settingsSelectedChannels = channels;
        settingsSelectedReligions = religions;
        ui.maxWatch.value = Math.round((data.settings.max_daily_minutes || 0) / 60);
      } else {
        renderSettingsReligions(settingsSelectedReligions);
      }
      const unlocked = Date.now() - settingsUnlockedAt < SETTINGS_UNLOCK_MS;
      ui.settingsPassword.required = !unlocked;
      ui.settingsPassword.value = "";
      await fetchTopics();
      await fetchSettingsChannels("");
      renderSettingsReligions(settingsSelectedReligions);
      await loadHistory();
      openModal(ui.settingsModal);
    }

    async function confirmSettingsAuth(event) {
      event.preventDefault();
      if (!firebaseUser) {
        ui.settingsAuthMessage.textContent = t("message_sign_in_first");
        return;
      }
      const password = ui.settingsAuthPassword.value;
      if (!password) {
        ui.settingsAuthMessage.textContent = t("message_password_required");
        return;
      }
      try {
        const credential = firebase.auth.EmailAuthProvider.credential(firebaseUser.email, password);
        await firebaseUser.reauthenticateWithCredential(credential);
        token = await firebaseUser.getIdToken(true);
        settingsUnlockedAt = Date.now();
      } catch (err) {
        ui.settingsAuthMessage.textContent = err.message || t("message_password_check_failed");
        return;
      }
      closeModal(ui.settingsAuthModal);
      openSettingsForm();
    }

    async function fetchTopics() {
      if (!currentUser) {
        return;
      }
      const res = await apiFetch("/api/topics");
      const data = await res.json();
      availableTopics = Array.isArray(data.topics) ? data.topics : [];
      ui.topicsList.innerHTML = "";
      availableTopics.forEach((topic) => {
        const option = document.createElement("option");
        option.value = topic;
        ui.topicsList.appendChild(option);
      });
      if (!ui.settingsModal.classList.contains("active")) {
        return;
      }
      renderTopicsList(settingsSelectedTopics);
    }

    function renderTopicsList(selectedTopics) {
      const filter = ui.settingsTopicSearch.value.trim().toLowerCase();
      ui.settingsTopics.innerHTML = "";
      const filtered = availableTopics.filter((topic) => topic.includes(filter));
      if (!filtered.length) {
        const empty = document.createElement("div");
        empty.className = "card-meta";
        empty.textContent = t("message_no_topics");
        ui.settingsTopics.appendChild(empty);
        return;
      }
      filtered.forEach((topic) => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "checkbox";
        input.name = "settings-topic";
        input.value = topic;
        input.checked = selectedTopics.has(topic);
        input.addEventListener("change", () => {
          if (input.checked) {
            selectedTopics.add(topic);
          } else {
            selectedTopics.delete(topic);
          }
        });
        label.appendChild(input);
        label.appendChild(document.createTextNode(" " + topic));
        ui.settingsTopics.appendChild(label);
      });
    }

    async function fetchSettingsChannels(query) {
      if (!currentUser) {
        return;
      }
      const params = new URLSearchParams();
      params.set("limit", "100");
      params.set("offset", "0");
      params.set("all", "1");
      if (query) {
        params.set("search", query);
      }
      const res = await apiFetch("/api/channels?" + params.toString());
      const data = await res.json();
      settingsAvailableChannels = Array.isArray(data.channels) ? data.channels : [];
      renderSettingsChannels(settingsSelectedChannels);
    }

    function renderSettingsChannels(selectedChannels) {
      const filter = ui.settingsChannelSearch.value.trim().toLowerCase();
      ui.settingsChannels.innerHTML = "";
      const filtered = settingsAvailableChannels.filter((channel) =>
        String(channel.display_name || "").toLowerCase().includes(filter)
      );
      if (!filtered.length) {
        const empty = document.createElement("div");
        empty.className = "empty-state";
        empty.textContent = t("message_no_channels");
        ui.settingsChannels.appendChild(empty);
        return;
      }
      filtered.forEach((channel) => {
        const label = document.createElement("label");
        label.className = "channel";
        const input = document.createElement("input");
        input.type = "checkbox";
        input.name = "settings-channel";
        input.value = channel.id;
        input.checked = selectedChannels.has(String(channel.id));
        input.addEventListener("change", () => {
          if (input.checked) {
            selectedChannels.add(String(channel.id));
          } else {
            selectedChannels.delete(String(channel.id));
          }
        });
        const avatar = document.createElement("span");
        avatar.className = "avatar";
        avatar.setAttribute("aria-hidden", "true");
        setAvatar(avatar, channel.avatar_url);
        const info = document.createElement("div");
        info.innerHTML =
          "<div class=\"channel-name\">" +
          escapeHtml(channel.display_name || t("label_creator")) +
          "</div><div class=\"card-meta\">" +
          escapeHtml(channel.slogan || "") +
          "</div>";
        label.appendChild(input);
        label.appendChild(avatar);
        label.appendChild(info);
        ui.settingsChannels.appendChild(label);
      });
    }

    function renderSettingsReligions(selectedReligions) {
      if (!ui.settingsReligions) return;
      const inputs = ui.settingsReligions.querySelectorAll("input[name='settings-religion']");
      inputs.forEach((input) => {
        input.checked = selectedReligions.has(input.value);
        input.onchange = () => {
          if (input.checked) {
            selectedReligions.add(input.value);
          } else {
            selectedReligions.delete(input.value);
          }
        };
      });
    }

    async function loadHistory() {
      const res = await apiFetch("/api/history");
      const data = await res.json();
      ui.historyList.innerHTML = "";
      if (!res.ok) {
        ui.historyList.textContent = data.error || t("message_history_unavailable");
        return;
      }
      if (!data.history || !data.history.length) {
        ui.historyList.textContent = t("message_no_history");
        return;
      }
      data.history.forEach((item) => {
        const row = document.createElement("div");
        row.className = "channel";
        row.innerHTML =
          "<span class=\"avatar\" aria-hidden=\"true\"></span>" +
          "<div><div class=\"channel-name\">" +
          escapeHtml(item.title) +
          "</div><div class=\"card-meta\">" +
          escapeHtml(item.channel) +
          " · " +
          new Date(item.watched_at).toLocaleTimeString() +
          "</div></div>";
        const actions = document.createElement("div");
        actions.className = "channel-actions";
        const playBtn = document.createElement("button");
        playBtn.type = "button";
        playBtn.className = "ghost";
        playBtn.textContent = t("control_play");
        playBtn.addEventListener("click", () => playVideoById(item.video_id));
        const deleteBtn = document.createElement("button");
        deleteBtn.type = "button";
        deleteBtn.className = "ghost";
        deleteBtn.textContent = t("action_delete");
        deleteBtn.addEventListener("click", async () => {
          const del = await apiFetch("/api/history/" + item.id, { method: "DELETE" });
          if (del.ok) {
            loadHistory();
          }
        });
        actions.appendChild(playBtn);
        actions.appendChild(deleteBtn);
        row.appendChild(actions);
        ui.historyList.appendChild(row);
      });
    }

    async function saveSettings(event) {
      event.preventDefault();
      ui.settingsMessage.textContent = "";
      if (!firebaseUser) {
        ui.settingsMessage.textContent = t("message_sign_in_first");
        return;
      }
      const unlocked = Date.now() - settingsUnlockedAt < SETTINGS_UNLOCK_MS;
      const password = ui.settingsPassword.value;
      if (!unlocked) {
        if (!password) {
          ui.settingsMessage.textContent = t("message_password_required");
          return;
        }
        try {
          const credential = firebase.auth.EmailAuthProvider.credential(firebaseUser.email, password);
          await firebaseUser.reauthenticateWithCredential(credential);
          token = await firebaseUser.getIdToken(true);
          settingsUnlockedAt = Date.now();
        } catch (err) {
          ui.settingsMessage.textContent = err.message || t("message_password_check_failed");
          return;
        }
      }
      const languages = Array.from(
        document.querySelectorAll("input[name='settings-language']:checked")
      ).map((input) => input.value);
      const topics = Array.from(settingsSelectedTopics);
      const topicMode = document.querySelector("input[name='topic-mode']:checked").value;
      const channels = Array.from(settingsSelectedChannels);
      const channelMode = document.querySelector("input[name='channel-mode']:checked").value;
      const religions = Array.from(settingsSelectedReligions);
      const religionMode =
        (document.querySelector("input[name='religion-mode']:checked") || {}).value || "allow";
      const maxDailyMinutes = Math.max(
        0,
        Math.min(24 * 60, parseInt(ui.maxWatch.value || "0", 10) * 60)
      );
      const res = await apiFetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          languages,
          topics,
          topicMode,
          channels,
          channelMode,
          religions,
          religionMode,
          maxDailyMinutes
        })
      });
      if (!res.ok) {
        const data = await res.json();
        ui.settingsMessage.textContent = data.error || t("message_settings_save_failed");
        return;
      }
      closeModal(ui.settingsModal);
      fetchVideos(ui.searchInput.value.trim(), true);
    }

    function openReport() {
      if (!currentUser) {
        lockApp(t("message_sign_in"));
        return;
      }
      ui.reportMessage.textContent = "";
      ui.reportForm.reset();
      openModal(ui.reportModal);
    }

    async function submitReport(event) {
      event.preventDefault();
      if (!currentVideo) {
        ui.reportMessage.textContent = t("message_no_video_selected");
        return;
      }
      const reason = document.getElementById("report-reason").value.trim();
      if (reason.length < 5) {
        ui.reportMessage.textContent = t("message_reason_short");
        return;
      }
      const res = await apiFetch("/api/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId: currentVideo.id, reason })
      });
      const data = await res.json();
      if (!res.ok) {
        ui.reportMessage.textContent = data.error || t("message_report_failed");
        return;
      }
      ui.reportMessage.textContent = t("message_report_thanks");
      setTimeout(() => closeModal(ui.reportModal), 900);
    }

    async function openNotifications() {
      if (!currentUser) {
        lockApp(t("message_sign_in"));
        return;
      }
      ui.notificationsList.innerHTML = t("status_loading");
      const res = await apiFetch("/api/notifications");
      const data = await res.json();
      ui.notificationsList.innerHTML = "";
      if (!res.ok || !data.notifications || !data.notifications.length) {
        updateNotificationBadge(false);
        ui.notificationsList.textContent = t("message_no_updates");
        openModal(ui.notificationsModal);
        return;
      }
      const hasUnread = data.notifications.some((note) => !note.read_at);
      updateNotificationBadge(hasUnread);
      data.notifications.forEach((note) => {
        const row = document.createElement("div");
        row.className = "channel";
        row.innerHTML =
          "<span class=\"avatar\" aria-hidden=\"true\"></span>" +
          "<div><div class=\"channel-name\">" +
          t("label_update") +
          "</div><div class=\"card-meta\">" +
          escapeHtml(note.message) +
          "</div></div>";
        const actions = document.createElement("div");
        actions.className = "channel-actions";
        const button = document.createElement("button");
        button.type = "button";
        button.className = "pill";
        button.textContent = note.read_at ? t("label_read") : t("action_mark_read");
        button.disabled = Boolean(note.read_at);
        button.addEventListener("click", async () => {
          await apiFetch("/api/notifications/" + note.id + "/read", { method: "POST" });
          openNotifications();
        });
        actions.appendChild(button);
        row.appendChild(actions);
        ui.notificationsList.appendChild(row);
      });
      openModal(ui.notificationsModal);
    }

    function startTicker() {
      if (timeTicker) {
        return;
      }
      timeTicker = setInterval(syncTimelineDisplay, 500);
    }

    function attemptAutoplay() {
      if (!player || !player.playVideo) {
        return;
      }
      if (player.mute) {
        player.mute();
      }
      player.playVideo();
      setTimeout(() => {
        const state = player.getPlayerState ? player.getPlayerState() : null;
        if (state !== YT.PlayerState.PLAYING) {
          setOverlayState(false, true, false);
        }
      }, 800);
    }

    function onPlayerReady() {
      isPlayerReady = true;
      if (playerReloadTimer) {
        clearTimeout(playerReloadTimer);
      }
      updateStatus("status_ready");
      setPlayerState("ready");
      setOverlayState(false, true, false);
      attemptAutoplay();
      syncControlLabels();
      setPreferredQuality();
      startTicker();
      setCaptions();
      if (videos.length) {
        loadVideo(0);
      }
    }

    function onPlayerStateChange(event) {
      if (event.data === YT.PlayerState.ENDED) {
        updateStatus("status_ended");
        setPlayerState("ended");
        flashState("ended");
        if (autoNextEnabled) {
          loadNextVideo();
        } else {
          setOverlayState(false, false, true);
        }
      } else if (event.data === YT.PlayerState.PLAYING) {
        setOverlayState(false, false, false);
        updateStatus("status_playing");
        setPlayerState("playing");
        flashState("play");
      } else if (event.data === YT.PlayerState.PAUSED) {
        updateStatus("status_paused");
        setPlayerState("paused");
        flashState("pause");
      } else if (event.data === YT.PlayerState.BUFFERING) {
        updateStatus("status_buffering");
        setPlayerState("buffering");
        flashState("buffer");
      }
      syncControlLabels();
    }

    function onPlayerError() {
      updateStatus("status_error");
      setPlayerState("error");
      setOverlayState(false, false, false);
    }

    function startVideo() {
      if (!player) {
        return;
      }
      if (player.unMute) {
        player.unMute();
      }
      player.playVideo();
      setPreferredQuality();
      setPlayerState("playing");
      setOverlayState(false, false, false);
      flashState("play");
    }

    function togglePlay() {
      if (!player) {
        return;
      }
      const state = player.getPlayerState ? player.getPlayerState() : null;
      if (state === YT.PlayerState.PLAYING) {
        player.pauseVideo();
        setPlayerState("paused");
        flashState("pause");
      } else {
        player.playVideo();
        setPreferredQuality();
        setPlayerState("playing");
        flashState("play");
      }
    }

    function toggleMute() {
      if (!player) {
        return;
      }
      if (player.isMuted && player.isMuted()) {
        player.unMute();
      } else if (player.mute) {
        player.mute();
      }
      syncControlLabels();
    }

    function changeVolume(delta) {
      if (!player || !player.getVolume || !player.setVolume) {
        return;
      }
      const next = Math.max(0, Math.min(100, player.getVolume() + delta));
      player.setVolume(next);
      if (next > 0 && player.unMute) {
        player.unMute();
      }
      syncControlLabels();
    }

    function handleSeekInput() {
      isSeeking = true;
      ui.timeCurrent.textContent = formatTime(Number(ui.seekBar.value));
      updateSeekBarFill();
    }

    function handleSeekCommit() {
      isSeeking = false;
      const currentTime = player && player.getCurrentTime ? player.getCurrentTime() : 0;
      const target = Number(ui.seekBar.value);
      if (player && player.seekTo) {
        player.seekTo(target, true);
      }
      syncTimelineDisplay();
      flashSeek(target - currentTime);
    }

    function toggleAutoNext() {
      autoNextEnabled = !autoNextEnabled;
      updateNextUp();
      syncControlLabels();
    }

    function toggleFullscreen() {
      const container = document.getElementById("player-shell");
      if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
          container.requestFullscreen();
        }
      } else if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }

    function setPreferredQuality() {
      if (!player || !player.setPlaybackQuality) {
        return;
      }
      const selected = ui.qualitySelect ? ui.qualitySelect.value : "default";
      const target = selected === "default" || !userQualityChoice ? "hd1080" : selected;
      if (ui.qualitySelect && !userQualityChoice && target !== ui.qualitySelect.value) {
        ui.qualitySelect.value = target;
      }
      player.setPlaybackQuality(target);
    }

    function setQuality() {
      if (!player || !player.setPlaybackQuality) {
        return;
      }
      userQualityChoice = true;
      const value = ui.qualitySelect.value === "default" ? "hd1080" : ui.qualitySelect.value;
      player.setPlaybackQuality(value);
      flashState("play");
    }

    function setCaptions() {
      if (!player) {
        return;
      }
      const value = ui.captionSelect ? ui.captionSelect.value : "off";
      if (value === "off") {
        if (player.unloadModule) {
          player.unloadModule("captions");
        }
        return;
      }
      const languageMap = {
        english: "en",
        russian: "ru",
        chinese: "zh",
        turkish: "tr",
        azerbaijani: "az",
        arabic: "ar"
      };
      if (player.loadModule) {
        player.loadModule("captions");
      }
      if (player.setOption) {
        player.setOption("captions", "track", { languageCode: languageMap[value] || "en" });
      }
    }

    function seekBy(seconds) {
      if (!player || !player.getCurrentTime || !player.seekTo) {
        return;
      }
      const current = player.getCurrentTime();
      const duration = player.getDuration ? player.getDuration() : 0;
      const next = Math.max(0, Math.min(duration || current + seconds, current + seconds));
      player.seekTo(next, true);
      syncTimelineDisplay();
      flashSeek(next - current);
    }

    async function toggleHeart() {
      if (!currentUser) {
        lockApp(t("message_sign_in"));
        return;
      }
      if (!currentVideo) {
        return;
      }
      const res = await apiFetch("/api/videos/" + currentVideo.id + "/like", { method: "POST" });
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      currentVideo.hearts = data.hearts;
      currentVideo.liked = data.liked;
      updateHeartButton();
      updateVideoMeta(currentVideo);
    }

    ui.searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = ui.searchInput.value.trim();
      const path = query ? "/search?q=" + encodeURIComponent(query) : "/search";
      navigateTo(path);
    });

    if (ui.drawerToggle) {
      ui.drawerToggle.addEventListener("click", toggleDrawer);
    }
    if (ui.drawerClose) {
      ui.drawerClose.addEventListener("click", closeDrawer);
    }
    if (ui.drawerOverlay) {
      ui.drawerOverlay.addEventListener("click", closeDrawer);
    }
    if (ui.settingsBar) {
      ui.settingsBar.addEventListener("click", openSettings);
    }
    if (ui.requestForm) {
      ui.requestForm.addEventListener("submit", sendRequest);
    }
    if (ui.requestReason) {
      ui.requestReason.addEventListener("change", (event) => updateRequestFields(event.target.value));
      updateRequestFields(ui.requestReason.value);
    }
    if (ui.requestForm) {
      ui.requestForm.addEventListener("submit", sendRequest);
    }
    if (ui.requestReason) {
      ui.requestReason.addEventListener("change", (event) => updateRequestFields(event.target.value));
      updateRequestFields(ui.requestReason.value);
    }
    if (ui.playerShell) {
      ui.playerShell.addEventListener("dblclick", togglePlay);
    }
    if (ui.fullscreenExitBtn) {
      ui.fullscreenExitBtn.addEventListener("click", toggleFullscreen);
    }

    if (ui.themeToggle) {
      ui.themeToggle.style.display = "none";
    }

    ui.viewTheater.addEventListener("click", () => setView("theater"));
    ui.viewMini.addEventListener("click", () => setView("mini"));
    ui.controlsToggle.addEventListener("click", () => setDockCollapsed(!dockCollapsed));
    ui.filterSubscribed.addEventListener("click", () => {
      setFeedFilter(feedFilter === "subscribed" ? "all" : "subscribed");
    });
    ui.settingsTopicSearch.addEventListener("input", () => {
      renderTopicsList(settingsSelectedTopics);
    });
    ui.settingsChannelSearch.addEventListener("input", () => {
      fetchSettingsChannels(ui.settingsChannelSearch.value.trim());
    });
    ui.channelBack.addEventListener("click", () => {
      currentChannel = null;
      showChannelView(false);
      if (window.history.length > 1) {
        window.history.back();
      } else {
        navigateTo("/", { replace: true });
      }
    });
    ui.channelSubscribe.addEventListener("click", () => {
      if (!currentChannel) {
        return;
      }
      toggleSubscription(currentChannel.id);
    });

    ui.authOpen.addEventListener("click", () => lockApp(t("message_sign_in")));
    ui.authLogout.addEventListener("click", openSignout);
    ui.uploadOpen.addEventListener("click", () => openModal(ui.uploadModal));
    ui.adminOpen.addEventListener("click", () => navigateTo("/admin"));
    ui.adminOverviewOpen.addEventListener("click", () => navigateTo("/admin"));
    ui.adminUsersOpen.addEventListener("click", () => navigateTo("/admin/users"));
    ui.adminChannelsOpen.addEventListener("click", () => navigateTo("/admin/channels"));
    ui.adminReportsOpen.addEventListener("click", () => navigateTo("/admin/reports"));
    ui.adminImportsOpen.addEventListener("click", () => navigateTo("/admin/imports"));
    if (ui.navRequests) {
      ui.navRequests.addEventListener("click", goRequest);
    }
    if (ui.studioOpen) {
      ui.studioOpen.addEventListener("click", openStudio);
    }
    ui.settingsOpen.addEventListener("click", openSettings);
    ui.notificationsOpen.addEventListener("click", openNotifications);
    if (ui.channelsOpen) {
      ui.channelsOpen.addEventListener("click", () => navigateTo("/channels"));
    }
    ui.channelsPageOpen.addEventListener("click", () => navigateTo("/channels"));
    ui.channelsBack.addEventListener("click", () => navigateTo("/"));
    ui.channelsSearch.addEventListener("input", () =>
      navigateTo("/channels?q=" + encodeURIComponent(ui.channelsSearch.value.trim()), { replace: true })
    );
    ui.channelsSort.addEventListener("change", applyChannelsFilters);
    ui.channelsFilterSubscribed.addEventListener("change", applyChannelsFilters);
    ui.channelsLoadMore.addEventListener("click", () => {
      if (channelsHasMore) {
        fetchChannelsPage(channelsQuery, false);
      }
    });
    ui.adminVideosBack.addEventListener("click", () => navigateTo("/"));
    ui.adminVideosSearchPage.addEventListener("input", () =>
      navigateTo("/admin/videos?q=" + encodeURIComponent(ui.adminVideosSearchPage.value.trim()), { replace: true })
    );
    ui.adminVideosLoadMore.addEventListener("click", () => {
      if (adminVideosHasMore) {
        fetchAdminVideosPage(adminVideosQuery, false);
      }
    });
    ui.adminVideosOpen.addEventListener("click", () => navigateTo("/admin/videos"));
    ui.adminOverviewBack.addEventListener("click", () => navigateTo("/"));
    ui.adminUsersBack.addEventListener("click", () => navigateTo("/"));
    ui.adminChannelsBack.addEventListener("click", () => navigateTo("/"));
    ui.adminReportsBack.addEventListener("click", () => navigateTo("/"));
    ui.adminImportsBack.addEventListener("click", () => navigateTo("/"));
    ui.adminUsersSearchPage.addEventListener("input", () =>
      navigateTo("/admin/users?q=" + encodeURIComponent(ui.adminUsersSearchPage.value.trim()), { replace: true })
    );
    ui.adminChannelsSearchPage.addEventListener("input", () =>
      navigateTo("/admin/channels?q=" + encodeURIComponent(ui.adminChannelsSearchPage.value.trim()), { replace: true })
    );
    ui.adminUsersLoadMore.addEventListener("click", () => {
      if (adminUsersPageHasMore) {
        fetchAdminUsersPage(adminUsersPageQuery, false);
      }
    });
    ui.adminChannelsLoadMore.addEventListener("click", () => {
      if (adminChannelsPageHasMore) {
        fetchAdminChannelsPage(adminChannelsPageQuery, false);
      }
    });
    ui.contactOpen.addEventListener("click", () => openModal(ui.contactModal));
    ui.adminImportCsv.addEventListener("click", importCsv);
    ui.adminImportSql.addEventListener("click", importSql);
    ui.adminExportSql.addEventListener("click", exportSql);
    ui.adminImportCsvPage.addEventListener("click", () =>
      importCsv({ csv: ui.adminCsvPage, message: ui.adminImportMessagePage })
    );
    ui.adminImportSqlPage.addEventListener("click", () =>
      importSql({ sql: ui.adminSqlPage, message: ui.adminImportMessagePage })
    );
    ui.adminExportSqlPage.addEventListener("click", () => exportSql(ui.adminImportMessagePage));
    ui.adminUserSearch.addEventListener("input", () =>
      fetchAdminUsersRemote(ui.adminUserSearch.value.trim(), "")
    );
    ui.adminChannelSearch.addEventListener("input", () =>
      fetchAdminUsersRemote(ui.adminChannelSearch.value.trim(), "artist")
    );
    ui.adminVideoSearch.addEventListener("input", () =>
      fetchAdminVideosRemote(ui.adminVideoSearch.value.trim())
    );
    ui.adminTabs.forEach((button) => {
      button.addEventListener("click", () => setAdminTab(button.dataset.adminTab));
    });

    ui.loginForm.addEventListener("submit", handleLogin);
    ui.registerForm.addEventListener("submit", handleRegister);
    ui.verifyResend.addEventListener("click", resendVerification);
    ui.uploadForm.addEventListener("submit", handleUpload);
    ui.settingsForm.addEventListener("submit", saveSettings);
    ui.settingsAuthForm.addEventListener("submit", confirmSettingsAuth);
    ui.profileForm.addEventListener("submit", saveProfile);
    ui.signoutForm.addEventListener("submit", confirmSignout);
    ui.reportForm.addEventListener("submit", submitReport);

    ui.playToggle.addEventListener("click", togglePlay);
    ui.muteToggle.addEventListener("click", toggleMute);
    ui.volumeDown.addEventListener("click", () => changeVolume(-10));
    ui.volumeUp.addEventListener("click", () => changeVolume(10));
    ui.autoNextToggle.addEventListener("click", toggleAutoNext);
    ui.controlsFullscreen.addEventListener("click", toggleFullscreen);
    ui.qualitySelect.addEventListener("change", setQuality);
    if (ui.captionSelect) {
      ui.captionSelect.addEventListener("change", setCaptions);
    }
    if (ui.uiLanguage) {
      ui.uiLanguage.addEventListener("change", (event) => setUiLanguage(event.target.value));
    }
    if (ui.forgotPassword) {
      ui.forgotPassword.addEventListener("click", sendPasswordReset);
    }
    ui.controlsSeekBack.addEventListener("click", () => seekBy(-30));
    ui.controlsSeekForward.addEventListener("click", () => seekBy(30));
    ui.controlsHeart.addEventListener("click", toggleHeart);
    ui.controlsReport.addEventListener("click", openReport);
    document.querySelectorAll("[data-action='replay']").forEach((button) => {
      button.addEventListener("click", () => {
        if (player && player.seekTo) {
          player.seekTo(0, true);
          player.playVideo();
        }
      });
    });
    document.querySelectorAll("[data-action='next']").forEach((button) => {
      button.addEventListener("click", loadNextVideo);
    });
    document.querySelectorAll("[data-action='start']").forEach((button) => {
      button.addEventListener("click", startVideo);
    });

    ui.seekBar.addEventListener("input", handleSeekInput);
    ui.seekBar.addEventListener("change", handleSeekCommit);

    document.querySelectorAll("[data-close]").forEach((button) => {
      button.addEventListener("click", () => {
        const target = document.getElementById(button.getAttribute("data-close"));
        if (target) {
          closeModal(target);
        }
      });
    });

    document.addEventListener("fullscreenchange", updateFullscreenButton);

    const goHome = () => {
      navFocus = "home";
      setPrimaryNav("feed");
      navigateTo("/");
    };

    const goChannels = () => {
      navFocus = "channels";
      setPrimaryNav("channels");
      navigateTo("/channels");
    };

    const goViral = () => {
      navFocus = "viral";
      setPrimaryNav("viral");
      navigateTo("/viral");
      setTimeout(() => {
        setPageView("viral");
      }, 10);
    };

    const goRequest = () => {
      navFocus = "request";
      setPrimaryNav("request");
      navigateTo("/request");
      setTimeout(() => setPageView("request"), 10);
    };

    [ui.navHome, ui.railHome].forEach((button) => button && button.addEventListener("click", goHome));
    [ui.navChannels, ui.railChannels].forEach((button) => button && button.addEventListener("click", goChannels));
    [ui.navExplore, ui.railViral].forEach((button) => button && button.addEventListener("click", goViral));
    if (ui.navRequests) {
      ui.navRequests.addEventListener("click", goRequest);
    }

    if (ui.heroChannels) {
      ui.heroChannels.addEventListener("click", goChannels);
    }
    if (ui.heroPlay) {
      ui.heroPlay.addEventListener("click", () => {
        navFocus = "home";
        setPrimaryNav("feed");
        if (ui.playerArea) {
          ui.playerArea.scrollIntoView({ behavior: "smooth" });
        }
        if (!currentVideo && videos.length) {
          loadVideo(0);
        }
      });
    }

    if (ui.accountChip) {
    ui.accountChip.addEventListener("click", () => {
      if (currentUser) {
        openStudio();
      } else {
        lockApp(t("message_sign_in"));
      }
    });
    }

    setUiLanguage(getUiLanguage());
    setTheme();
    setView("default");
    setDockCollapsed(dockCollapsed);
    updateFullscreenButton();

    ui.loadMore.addEventListener("click", () => {
      if (hasMore) {
        fetchVideos(ui.searchInput.value.trim(), false);
      }
    });
    ui.searchLoadMore.addEventListener("click", () => {
      if (searchHasMore) {
        fetchSearchResults(searchQuery, false);
      }
    });
    ui.searchBack.addEventListener("click", () => {
      navigateTo("/");
    });

    function navigateTo(path, options = {}) {
      const target = path || "/";
      if (options.replace) {
        window.history.replaceState({}, "", target);
      } else {
        window.history.pushState({}, "", target);
      }
      handleRoute();
    }

    function handleRoute() {
      const path = window.location.pathname || "/";
      const params = new URLSearchParams(window.location.search);
      if (path === "/channels") {
        const query = params.get("q") || "";
        ui.channelsSearch.value = query;
        fetchChannelsPage(query, true);
        return;
      }
      if (path === "/search") {
        const query = params.get("q") || "";
        ui.searchInput.value = query;
        fetchSearchResults(query, true);
        return;
      }
      if (path === "/viral") {
        navFocus = "viral";
        setPageView("viral");
        fetchViral();
        return;
      }
      if (path === "/request") {
        navFocus = "request";
        setPageView("request");
        return;
      }
      if (path.startsWith("/admin") && !currentUser) {
        setPageView("feed");
        return;
      }
      if (path.startsWith("/admin") && currentUser && currentUser.role !== "admin") {
        window.history.replaceState({}, "", "/");
        setPageView("feed");
        return;
      }
      if (path === "/admin" || path === "/admin/overview") {
        fetchAdminOverviewPage();
        return;
      }
      if (path === "/admin/users") {
        const query = params.get("q") || "";
        ui.adminUsersSearchPage.value = query;
        fetchAdminUsersPage(query, true);
        return;
      }
      if (path === "/admin/channels") {
        const query = params.get("q") || "";
        ui.adminChannelsSearchPage.value = query;
        fetchAdminChannelsPage(query, true);
        return;
      }
      if (path === "/admin/videos") {
        const query = params.get("q") || "";
        adminVideosOwnerId = params.get("owner") || "";
        ui.adminVideosSearchPage.value = query;
        fetchAdminVideosPage(query, true);
        return;
      }
      if (path === "/admin/reports") {
        fetchAdminReportsPage();
        return;
      }
      if (path === "/admin/imports") {
        openAdminImportsPage();
        return;
      }
      if (path.startsWith("/channel/")) {
        const parts = path.split("/").filter(Boolean);
        const channelId = parts[1];
        if (channelId) {
          openChannel(channelId, true);
          return;
        }
      }
      if (path.startsWith("/watch/")) {
        const parts = path.split("/").filter(Boolean);
        const videoId = parts[1];
        if (videoId) {
          openWatch(videoId);
          return;
        }
      }
      setPageView("feed");
    }

    window.addEventListener("popstate", handleRoute);

    lockApp(t("message_sign_in"));
    initFirebase();
    handleRoute();

    function onYouTubeIframeAPIReady() {
      player = new YT.Player("player", {
        height: "315",
        width: "560",
        videoId: "",
        playerVars: {
          rel: 0,
          modestbranding: 1,
          controls: 0,
          playsinline: 1,
          origin: window.location.origin
        },
        events: {
          onReady: onPlayerReady,
          onStateChange: onPlayerStateChange,
          onError: onPlayerError
        }
      });
      schedulePlayerReload();
    }
