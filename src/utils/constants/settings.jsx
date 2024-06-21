export const settings = {
  buttons: [
    // {
    //   title: "Introducción",
    //   subtitle: "Guía de nuestra aplicación.",
    //   icon: {
    //     left: require("@/utils/images/question.png"),
    //     right: require("@/utils/images/arrow_right.png"),
    //   },
    //   route: "Introduction",
    //   // routePush: true,
    // },
    {
      title: "Política de privacidad",
      subtitle: "Ver detalles de nuestra política.",
      icon: {
        left: require("@/utils/images/folder.png"),
        right: require("@/utils/images/arrow_right.png"),
      },
      // route: "Terms",
      web: "https://www.portaty.com/politicas",
      // routePush: true,
    },
    {
      title: "Contáctanos",
      subtitle:
        "Encuentra todas las maneras de ponerte en contacto con nosotros",
      icon: {
        left: require("@/utils/images/info_white.png"),
        right: require("@/utils/images/arrow_right.png"),
      },
      route: "Contact",
      // routePush: true,
    },
    {
      title: "Eliminar cuenta",
      subtitle: "Enviar una solicitud para eliminar su cuenta",
      icon: {
        left: require("@/utils/images/bug.png"),
      },
      modal: true,
      // routePush: true,
    },
    {
      title: "Cerrar sesión",
      icon: {
        left: require("@/utils/images/exit.png"),
      },
      // route: "Welcome",
      // routePush: true,
    },
  ],
};
