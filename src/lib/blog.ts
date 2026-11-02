import type { ContentSection } from "./seo-pages";

export type BlogPost = {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  publishedAt: string;
  category: string;
  excerpt: string;
  sections: ContentSection[];
};

// Add future posts here. Each entry automatically gets a page, metadata, and a sitemap URL.
export const blogPosts = [
  {
    slug: "como-elegir-medida-pallet",
    title: "Cómo elegir la medida de pallet para tu operación",
    metaTitle: "Cómo Elegir la Medida de un Pallet | Pallets Argentina",
    description: "Qué tener en cuenta al elegir medidas de pallet para depósito, manipulación y transporte, y qué información incluir en una cotización.",
    publishedAt: "2026-11-02",
    category: "Guía de compra",
    excerpt: "La medida adecuada depende de la carga y del circuito donde se va a mover. Revisá estos puntos antes de pedir presupuesto.",
    sections: [
      { heading: "Empezá por la unidad de carga", paragraphs: ["Tomá las dimensiones de la mercadería ya embalada y cómo se apoya sobre el pallet. Revisá si la carga sobresale, si necesita una base completa o si tiene una forma particular, como los tambores.", "También conviene confirmar el peso aproximado y cómo se distribuye. La capacidad final debe evaluarse para la configuración concreta; no se puede deducir solamente del nombre o la medida del pallet."] },
      { heading: "Revisá el recorrido dentro de la empresa", paragraphs: ["La misma unidad puede pasar por depósito, autoelevador, transporte y destino. Confirmá el espacio disponible, la forma de manipulación y cualquier medida que el cliente o el circuito logístico ya exija.", "Si el pallet se va a usar en más de una etapa, compartí todas las medidas requeridas antes de comprar para evitar incompatibilidades en el movimiento."] },
      { heading: "Compará las medidas disponibles", paragraphs: ["Como referencias, Pallets Argentina publica el pallet Arlog de 1.200 × 1.000 mm y el pallet Euro de 1.200 × 800 mm. Para otra medida, podés consultar una alternativa a medida.", "Si todavía no sabés cuál corresponde, enviá las dimensiones de la carga, el uso previsto, la cantidad y el destino. El equipo puede revisar esos datos para orientar la consulta."] },
    ],
  },
  {
    slug: "pallet-arlog-o-euro",
    title: "Pallet Arlog o pallet Euro: diferencias de medida",
    metaTitle: "Pallet Arlog o Euro: Medidas y Diferencias | Pallets Argentina",
    description: "Compará las medidas publicadas para el pallet Arlog y el pallet Euro y revisá qué datos confirmar antes de cotizar.",
    publishedAt: "2026-11-02",
    category: "Productos",
    excerpt: "La diferencia visible entre estas opciones es su medida de referencia. La elección depende del espacio, la carga y el circuito de tu empresa.",
    sections: [
      { heading: "Las medidas de referencia", paragraphs: ["En el catálogo de Pallets Argentina, el pallet Arlog figura con 1.200 × 1.000 mm y el pallet Euro con 1.200 × 800 mm. Confirmá cuál de esas dimensiones necesita tu depósito o cliente antes de solicitar una cantidad.", "No elijas solamente por el nombre: verificá el espacio disponible, cómo se manipula la carga y si hay requisitos propios del circuito de entrega."] },
      { heading: "Cuándo consultar por otra medida", paragraphs: ["Si ninguna de las dos medidas coincide con la unidad de carga o el espacio de trabajo, podés describir el requerimiento para consultar por una fabricación a medida.", "Para una consulta de exportación, indicá además el destino y los requisitos que te haya informado tu cliente o despachante. Las condiciones aplicables se revisan para cada pedido."] },
      { heading: "Qué incluir en el pedido", paragraphs: [], bullets: ["Medida requerida y cantidad aproximada", "Tipo y dimensiones de la carga", "Uso nacional o consulta para exportación", "Destino y cualquier requisito recibido"] },
    ],
  },
  {
    slug: "que-informacion-incluir-cotizacion-pallets",
    title: "Qué información incluir para cotizar pallets",
    metaTitle: "Qué Datos Enviar para Cotizar Pallets | Pallets Argentina",
    description: "Prepará una cotización de pallets con la medida, estado, tipo, cantidad, carga y destino. Así la consulta parte de los datos de tu operación.",
    publishedAt: "2026-11-02",
    category: "Cotizaciones",
    excerpt: "Una consulta clara ayuda a revisar la alternativa y disponibilidad con las medidas y cantidades solicitadas.",
    sections: [
      { heading: "Definí qué pallet necesitás", paragraphs: ["Indicá la medida, el estado buscado —nuevo, usado/reciclado o reciclado seleccionado— y el tipo de construcción si lo conocés. Si necesitás una medida especial, podés explicarla en los detalles.", "Sumá la capacidad de carga estimada según los datos de tu operación. Si no estás seguro, describí el producto y cómo se manipula para que puedan revisar la consulta."] },
      { heading: "Incluí cantidad y destino", paragraphs: ["La cantidad y la localidad de entrega ayudan a revisar disponibilidad y coordinación. El formulario no tiene un campo separado para localidad: agregala en “Detalles” junto con cualquier requisito de transporte o recepción.", "Para pedidos vinculados con exportación, especificá el destino y los requisitos que recibiste. No des por confirmada una condición o tratamiento hasta que se revise para tu caso."] },
      { heading: "Datos de contacto", paragraphs: ["Completá el nombre de la empresa, la persona de contacto y un email válido para que el equipo pueda responder. En detalles, agregá fechas deseadas o información adicional que ayude a entender la operación."] },
    ],
  },
] satisfies readonly BlogPost[];

export const blogSlugs = blogPosts.map((post) => post.slug);
