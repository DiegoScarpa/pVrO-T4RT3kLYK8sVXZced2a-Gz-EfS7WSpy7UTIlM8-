export type ContentSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type CommercialPageData = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  intro: string;
  sections: ContentSection[];
  related: { href: string; label: string }[];
};

export const commercialPages: Record<string, CommercialPageData> = {
  "pallets-de-madera": {
    slug: "pallets-de-madera",
    title: "Pallets de Madera en Argentina | Pallets Argentina",
    description: "Fabricación y venta de pallets de madera para depósitos, transporte y distribución. Consultá medidas estándar, especiales y disponibilidad.",
    eyebrow: "Pallets de madera",
    h1: "Pallets de madera para tu operación",
    intro: "Fabricamos pallets de madera para empresas que necesitan una base firme, medidas claras y una respuesta comercial directa.",
    sections: [
      { heading: "Medidas estándar y soluciones especiales", paragraphs: ["Trabajamos con opciones como pallet Arlog, pallet Euro y formatos especiales. La medida correcta depende de la carga, el espacio disponible y el circuito de movimiento.", "Si tu operación necesita otra configuración, podés indicarla en el formulario de cotización junto con la cantidad y el destino."], bullets: ["Pallet Arlog de 1.200 × 1.000 mm", "Pallet Euro de 1.200 × 800 mm", "Pallet para tambor y cargas especiales a medida"] },
      { heading: "Una compra pensada para B2B", paragraphs: ["Te ayudamos a comparar una alternativa estándar con una medida especial antes de confirmar el pedido. Así la cotización parte de información útil para depósito, transporte y distribución.", "También podés consultar por pallets nuevos, usados/reciclados o reciclados seleccionados según la necesidad de tu operación."] },
    ],
    related: [{ href: "/pallet-arlog/", label: "Ver pallet Arlog" }, { href: "/pallet-euro/", label: "Ver pallet Euro" }, { href: "/pallets-a-medida/", label: "Consultar pallets a medida" }],
  },
  "pallets-nuevos": {
    slug: "pallets-nuevos",
    title: "Pallets Nuevos | Venta para Empresas | Pallets Argentina",
    description: "Consultá por pallets nuevos de madera para logística, depósitos y distribución. Indicá medida, cantidad y destino para recibir una cotización.",
    eyebrow: "Pallets nuevos",
    h1: "Pallets nuevos para una base confiable",
    intro: "Una alternativa para empresas que necesitan incorporar pallets nuevos a su circuito de trabajo y quieren definir la compra con asesoramiento directo.",
    sections: [
      { heading: "Elegí la configuración que necesita tu carga", paragraphs: ["En la cotización podés indicar la medida, el tipo de pallet, la capacidad de carga buscada y la cantidad. Esa información permite orientar la propuesta sin asumir especificaciones que todavía no confirmaste."], bullets: ["Medidas estándar o especiales", "Pallet de 9 tacos o con tirantes/largueros", "Consulta de cantidad y destino"] },
      { heading: "Cotización para compras por volumen", paragraphs: ["Para recibir una recomendación concreta, contanos qué vas a mover, cuántas unidades necesitás y dónde deben entregarse. Respondemos con una alternativa alineada a tu operación."] },
    ],
    related: [{ href: "/pallets-de-madera/", label: "Conocer nuestros pallets de madera" }, { href: "/pallets-a-medida/", label: "Ver pallets a medida" }, { href: "/#cotizar", label: "Solicitar cotización" }],
  },
  "pallets-reciclados": {
    slug: "pallets-reciclados",
    title: "Pallets Reciclados y Usados | Pallets Argentina",
    description: "Consultá por pallets usados, reciclados y reciclados seleccionados para uso nacional. Indicá cantidad, medida y destino para evaluar disponibilidad.",
    eyebrow: "Pallets usados y reciclados",
    h1: "Pallets reciclados para uso nacional",
    intro: "Si buscás una alternativa usada o reciclada, podemos evaluar tu necesidad según medida, estado, cantidad y destino.",
    sections: [
      { heading: "Tres estados para orientar la consulta", paragraphs: ["El formulario distingue entre pallet usado/reciclado y pallet reciclado seleccionado. Elegí la opción que mejor describa lo que necesitás y sumá detalles sobre el uso previsto."], bullets: ["Pallet usado/reciclado", "Pallet reciclado seleccionado", "Consulta por cantidad y medidas"] },
      { heading: "Confirmamos disponibilidad antes de cerrar", paragraphs: ["La disponibilidad y el estado pueden depender de la medida y del volumen solicitado. Por eso la cotización se confirma con la información completa de tu pedido."] },
    ],
    related: [{ href: "/pallets-de-madera/", label: "Comparar con pallets de madera" }, { href: "/pallets-nuevos/", label: "Ver pallets nuevos" }, { href: "/#cotizar", label: "Consultar disponibilidad" }],
  },
  "pallets-a-medida": {
    slug: "pallets-a-medida",
    title: "Pallets a Medida para Empresas | Pallets Argentina",
    description: "Fabricación de pallets a medida según carga, espacio y circuito de trabajo. Enviá tus requerimientos y solicitá una cotización.",
    eyebrow: "Fabricación a medida",
    h1: "Pallets a medida para tu circuito",
    intro: "Cuando una medida estándar no alcanza, describinos la carga, el espacio y la forma de movimiento para evaluar una solución especial.",
    sections: [
      { heading: "Qué información conviene enviar", paragraphs: ["La cotización mejora cuando conocemos la medida buscada, el tipo de carga, la cantidad y el destino. También podés usar el campo de detalles para sumar restricciones de depósito o transporte."], bullets: ["Medida o plano disponible", "Tipo y peso de la carga", "Cantidad de unidades", "Uso nacional o exportación"] },
      { heading: "Una propuesta que parte de tu operación", paragraphs: ["No publicamos capacidades o especificaciones que no hayan sido confirmadas. Revisamos el pedido y respondemos con una recomendación clara antes de avanzar."] },
    ],
    related: [{ href: "/pallets-de-madera/", label: "Ver pallets de madera" }, { href: "/pallet-para-tambor/", label: "Ver pallet para tambor" }, { href: "/#cotizar", label: "Solicitar cotización a medida" }],
  },
  "pallets-para-exportacion": {
    slug: "pallets-para-exportacion",
    title: "Pallets para Exportación | Pallets Argentina",
    description: "Consultá pallets para exportación y requisitos de tratamiento CATEM según tu operación. Indicá destino, medida y cantidad para cotizar.",
    eyebrow: "Pallets para exportación",
    h1: "Pallets para exportación, según tu operación",
    intro: "La exportación requiere definir medida, circuito y requisitos del destino. Contanos esos datos para evaluar la alternativa adecuada.",
    sections: [
      { heading: "Definimos el pedido antes de cotizar", paragraphs: ["El formulario incluye la opción “para Exportación (Catem)” para identificar consultas que necesitan revisión específica. Sumá el destino y cualquier requisito indicado por tu despachante o cliente."], bullets: ["Pallet Euro de 1.200 × 800 mm", "Consulta de medidas especiales", "Revisión de requisitos de exportación"] },
      { heading: "Tratamiento y requisitos", paragraphs: ["No asumimos certificaciones ni condiciones aduaneras sin confirmación. Te pedimos la información del embarque para responder qué alternativa y tratamiento corresponden a tu caso."] },
    ],
    related: [{ href: "/pallet-euro/", label: "Conocer el pallet Euro" }, { href: "/pallets-a-medida/", label: "Consultar una medida especial" }, { href: "/#cotizar", label: "Solicitar cotización para exportación" }],
  },
  "pallets-para-logistica": {
    slug: "pallets-para-logistica",
    title: "Pallets para Logística y Distribución | Pallets Argentina",
    description: "Pallets de madera para logística, depósitos y distribución. Compará medidas estándar o especiales y pedí una cotización para tu operación.",
    eyebrow: "Logística y distribución",
    h1: "Pallets para logística y distribución",
    intro: "Una base confiable ayuda a ordenar el movimiento entre depósito, transporte y destino. Elegí una medida o consultá una solución especial.",
    sections: [
      { heading: "Pensados para circuitos de movimiento", paragraphs: ["El pallet Arlog ofrece una referencia estándar; el pallet Euro, una medida normalizada para circuitos que la utilizan; y los formatos especiales permiten adaptar la base a cargas particulares."], bullets: ["Depósitos y centros de distribución", "Transporte y movimiento interno", "Compras por cantidad"] },
      { heading: "Coordinamos la consulta comercial", paragraphs: ["Indicá cantidad, medida, estado del pallet y destino. Con esa información podemos orientar la propuesta y confirmar la coordinación de entrega."] },
    ],
    related: [{ href: "/pallet-arlog/", label: "Ver pallet Arlog" }, { href: "/pallet-euro/", label: "Ver pallet Euro" }, { href: "/pallets-buenos-aires/", label: "Ver cobertura en Buenos Aires" }],
  },
  "pallets-para-industria": {
    slug: "pallets-para-industria",
    title: "Pallets Industriales para Empresas | Pallets Argentina",
    description: "Soluciones de pallets de madera para operaciones industriales. Consultá medidas, cantidad y alternativas según el circuito de tu empresa.",
    eyebrow: "Pallets industriales",
    h1: "Pallets industriales para trabajo real",
    intro: "Fabricamos pallets para empresas que necesitan continuidad y una base definida para mover cargas dentro de su operación.",
    sections: [
      { heading: "Una especificación clara antes de comprar", paragraphs: ["Para una consulta industrial, detallá la medida disponible, el tipo de carga, la cantidad de pallets y el destino. Así podemos evaluar si conviene un formato estándar o a medida."], bullets: ["Pallet Arlog", "Pallet Euro", "Pallets especiales para cargas particulares"] },
      { heading: "Asesoramiento directo", paragraphs: ["No publicamos una capacidad genérica para todas las operaciones. La recomendación se realiza con los datos de tu carga y del circuito de trabajo."] },
    ],
    related: [{ href: "/pallets-a-medida/", label: "Ver pallets a medida" }, { href: "/pallets-de-madera/", label: "Ver pallets de madera" }, { href: "/#cotizar", label: "Hablar con Pallets Argentina" }],
  },
  "pallets-para-depositos": {
    slug: "pallets-para-depositos",
    title: "Pallets para Depósitos y Almacenamiento | Pallets Argentina",
    description: "Pallets de madera para depósitos y almacenamiento. Consultá la medida, cantidad y estado que necesita tu empresa.",
    eyebrow: "Depósitos y almacenamiento",
    h1: "Pallets para depósitos que no paran",
    intro: "Ordená tu consulta con la medida, el tipo de pallet y la cantidad que necesita tu depósito. Te ayudamos a encontrar una opción adecuada.",
    sections: [
      { heading: "Medidas para distintos espacios", paragraphs: ["El tamaño del pallet debe conversar con el espacio disponible y la forma de manipulación. Trabajamos con opciones estándar y también recibimos pedidos de medidas especiales."], bullets: ["Arlog: 1.200 × 1.000 mm", "Euro: 1.200 × 800 mm", "Medidas especiales a consultar"] },
      { heading: "Nuevo, usado o reciclado", paragraphs: ["El formulario permite indicar el estado buscado: nuevo, usado/reciclado o reciclado seleccionado. Sumá cualquier detalle relevante para el uso del depósito."] },
    ],
    related: [{ href: "/pallet-arlog/", label: "Ver pallet Arlog" }, { href: "/pallets-reciclados/", label: "Ver pallets reciclados" }, { href: "/#cotizar", label: "Solicitar presupuesto" }],
  },
  "pallets-buenos-aires": {
    slug: "pallets-buenos-aires",
    title: "Pallets de Madera en Buenos Aires | Pallets Argentina",
    description: "Venta y fabricación de pallets de madera para Buenos Aires, CABA y zonas Norte, Oeste y Sur. Consultá entrega, cantidad y disponibilidad.",
    eyebrow: "Servicio en Buenos Aires",
    h1: "Pallets de madera en Buenos Aires",
    intro: "Pallets Argentina informa atención en Buenos Aires, CABA, zona Norte, zona Oeste, zona Sur e interior del país. Confirmamos cada destino según volumen y pedido.",
    sections: [
      { heading: "Qué podés consultar", paragraphs: ["Trabajamos con pallet Arlog, pallet Euro, pallet para tambor, medidas especiales y alternativas nuevas o recicladas. La disponibilidad se revisa con la medida y cantidad solicitadas."], bullets: ["Venta para empresas y compras por cantidad", "Pallets estándar y a medida", "Coordinación de entrega según destino"] },
      { heading: "Cobertura y coordinación", paragraphs: ["Escribinos con tu localidad dentro de Buenos Aires, CABA o el interior para confirmar si podemos coordinar la entrega de tu pedido. No publicamos plazos ni costos generales porque dependen de la cantidad y del destino."] },
    ],
    related: [{ href: "/pallets-de-madera/", label: "Ver pallets de madera" }, { href: "/pallets-para-logistica/", label: "Ver pallets para logística" }, { href: "/#cotizar", label: "Consultar entrega y cotización" }],
  },
};

export const productPages = {
  "pallet-arlog": {
    title: "Pallet Arlog 1.200 × 1.000 mm | Pallets Argentina",
    description: "Conocé el pallet Arlog de 1.200 × 1.000 mm para depósitos, transporte y distribución. Consultá cantidad, disponibilidad y entrega.",
    eyebrow: "Producto 01 · Más elegido",
    h1: "Pallet Arlog de madera",
    intro: "Una medida estándar para empresas que necesitan una base versátil para depósitos, transporte y distribución nacional.",
    facts: ["Medida: 1.200 × 1.000 mm", "Material: madera", "Uso: depósitos, transporte y distribución", "Disponibilidad: consultar según cantidad y destino"],
    paragraphs: ["El pallet Arlog es una referencia habitual para operaciones que trabajan con la medida 1.200 × 1.000 mm. Antes de comprar, confirmá la cantidad, el estado requerido y el circuito donde se va a utilizar.", "No publicamos una capacidad de carga única porque depende de la configuración y de las condiciones de uso. Enviá los datos de tu operación para recibir una recomendación responsable."],
    related: [{ href: "/pallets-de-madera/", label: "Pallets de madera" }, { href: "/pallets-a-medida/", label: "Pallets a medida" }, { href: "/#cotizar", label: "Cotizar pallet Arlog" }],
  },
  "pallet-euro": {
    title: "Pallet Euro 1.200 × 800 mm | Pallets Argentina",
    description: "Conocé el pallet Euro de 1.200 × 800 mm para circuitos logísticos con medidas normalizadas. Consultá exportación, cantidad y destino.",
    eyebrow: "Producto 02 · Exportación",
    h1: "Pallet Euro de madera",
    intro: "Una medida normalizada para operaciones que trabajan con 1.200 × 800 mm y necesitan compatibilidad en su circuito logístico.",
    facts: ["Medida: 1.200 × 800 mm", "Material: madera", "Uso: circuitos logísticos y exportación a consultar", "Disponibilidad: consultar según cantidad y destino"],
    paragraphs: ["El pallet Euro ofrece una referencia de medida para circuitos que requieren 1.200 × 800 mm. La selección final depende de la carga, la manipulación y los requisitos del destino.", "Si el pedido es para exportación, indicá el destino y los requisitos recibidos para que podamos evaluar la alternativa y el tratamiento que correspondan. No asumimos certificaciones sin confirmación."],
    related: [{ href: "/pallets-para-exportacion/", label: "Pallets para exportación" }, { href: "/pallets-para-logistica/", label: "Pallets para logística" }, { href: "/#cotizar", label: "Cotizar pallet Euro" }],
  },
  "pallet-para-tambor": {
    title: "Pallet para Tambor y Cargas Especiales | Pallets Argentina",
    description: "Pallet para tambor y cargas cilíndricas o especiales. Consultá una solución a medida según peso, cantidad y circuito de trabajo.",
    eyebrow: "Producto 03 · Especial",
    h1: "Pallet para tambor y cargas especiales",
    intro: "Una base pensada para evaluar cargas cilíndricas y pesadas cuando una medida estándar no resuelve el movimiento.",
    facts: ["Configuración: a medida", "Material: madera", "Aplicación: tambores y cargas especiales", "Disponibilidad: consultar según requerimiento"],
    paragraphs: ["El pallet para tambor se consulta como una solución especial: la medida y la configuración deben conversar con la carga y el modo de manipulación.", "Para recibir una cotización útil, indicá diámetro, peso aproximado, cantidad y destino en el campo de detalles. La propuesta se confirma después de revisar esa información."],
    related: [{ href: "/pallets-a-medida/", label: "Pallets a medida" }, { href: "/pallets-para-industria/", label: "Pallets industriales" }, { href: "/#cotizar", label: "Consultar pallet para tambor" }],
  },
} as const;

export const commercialSlugs = Object.keys(commercialPages);
export const productSlugs = Object.keys(productPages);
