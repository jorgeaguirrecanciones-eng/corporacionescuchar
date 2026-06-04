export type Category = "historia" | "logro" | "prensa" | "reporte";

export interface Post {
  id: string;
  title: string;
  category: Category;
  date: string;
  cover_url: string;
  excerpt: string;
  body: string;
  featured: boolean;
  published: boolean;
  author?: string;
}

export const CATEGORY_META: Record<Category, { label: string; color: string; bg: string }> = {
  historia: { label: "Historia",  color: "#C8197A", bg: "#FDF0F7" },
  logro:    { label: "Logro",     color: "#1CBF45", bg: "#F0FDF4" },
  prensa:   { label: "Prensa",    color: "#6B2DB5", bg: "#F5F0FD" },
  reporte:  { label: "Reporte",   color: "#D97706", bg: "#FFFBEB" },
};

// TODO: reemplazar por fetch a Supabase tabla `posts`
export const MOCK_POSTS: Post[] = [
  {
    id: "1",
    title: "Lidia llegó callada. Se fue con la mochila más liviana.",
    category: "historia",
    date: "2025-05-20",
    cover_url: "https://static.wixstatic.com/media/cf2b8e_fe109ead2ca942babb72a4f947d2ea89~mv2.jpeg/v1/fill/w_800,h_500,al_c,q_85/cf2b8e_fe109ead2ca942babb72a4f947d2ea89~mv2.jpeg",
    excerpt: "Con 73 años, Lidia llegó al Círculo convencida de que nadie podría entenderla. Una hora después, algo en ella había cambiado para siempre.",
    body: `Lidia tiene 73 años y llegó a su primer Círculo de Escucha casi sin hablar. Sentada en una de las sillas dispuestas en círculo, miraba el suelo mientras los demás comenzaban a compartir.

"No sé por qué vine", confesó cuando le tocó su turno.

Pero siguió. Y poco a poco, palabra por palabra, fue soltando lo que cargaba: la soledad, el duelo de su marido, la sensación de ser una carga para sus hijos.

Lo que pasó después es lo que pasa siempre en los Círculos: nadie la juzgó. Nadie le dio consejos. Solo la escucharon.

Al final de la sesión, Lidia dijo una sola frase que resume todo lo que hacemos: *"Más liviana. Me voy más liviana."*

Historias como la de Lidia son la razón por la que existimos. Y son posibles gracias a quienes regalan un asiento.`,
    featured: true,
    published: true,
    author: "Equipo Escuchar",
  },
  {
    id: "2",
    title: "+8.500 personas han encontrado un espacio de escucha gratuito",
    category: "logro",
    date: "2025-04-10",
    cover_url: "https://static.wixstatic.com/media/cf2b8e_9868894826c4477cb8df0dee04c1ba37~mv2.jpg/v1/fill/w_800,h_500,al_c,q_85/cf2b8e_9868894826c4477cb8df0dee04c1ba37~mv2.jpg",
    excerpt: "Once años después de nuestro primer círculo, más de 8.500 personas han experimentado lo que es ser escuchadas de verdad.",
    body: `En 2014, realizamos nuestro primer Círculo de Escucha con un grupo pequeño en Santiago. Hoy, once años después, más de 8.500 personas han participado en nuestros espacios.

Este número no es solo una estadística. Detrás de cada uno hay una persona que llegó cargando algo, y que se fue un poco más liviana.

**Lo que hemos aprendido en este camino:**

La escucha genuina es transformadora, independiente del contexto socioeconómico. La comunidad que se forma en los Círculos continúa más allá de las sesiones. Y los voluntarios que facilitan los Círculos también se transforman en el proceso.

Gracias a todos quienes han hecho posible este camino: participantes, monitores, facilitadores, y quienes han regalado asientos para que otros puedan acceder.`,
    featured: false,
    published: true,
    author: "Corporación Escuchar",
  },
  {
    id: "3",
    title: "Mario, 36 años: 'Por primera vez, alguien me escuchó sin querer arreglarme'",
    category: "historia",
    date: "2025-03-22",
    cover_url: "https://static.wixstatic.com/media/cf2b8e_636483e26da6493c9d4390dd6f415131~mv2.jpeg/v1/fill/w_800,h_500,al_c,q_85/cf2b8e_636483e26da6493c9d4390dd6f415131~mv2.jpeg",
    excerpt: "Mario llegó al Círculo escéptico, 'llevado por su señora'. Lo que encontró fue algo completamente diferente a lo que esperaba.",
    body: `Mario tiene 36 años y trabaja en construcción. No es el perfil que uno imaginaría en un Círculo de Escucha.

"Me llevó mi señora", admite, con una sonrisa. "Yo iba de malo."

Pero algo pasó en esa primera sesión. Cuando le tocó hablar, habló de su padre. De cómo nunca pudo decirle que lo quería. De cómo eso lo seguía.

"Nadie me dijo qué hacer. Nadie me dijo que estaba bien o mal. Solo me escucharon."

Mario volvió. Y volvió. Hoy, después de ocho meses, está en proceso de formación como monitor voluntario.

"Quiero darles a otros lo que me dieron a mí", dice.

Eso es lo que hace posible un asiento regalado.`,
    featured: false,
    published: true,
    author: "Equipo Escuchar",
  },
  {
    id: "4",
    title: "La Tercera: 'Los círculos que están sanando comunidades en Chile'",
    category: "prensa",
    date: "2025-02-14",
    cover_url: "https://static.wixstatic.com/media/cf2b8e_0aff98c1e968414787d3f502cd1603e6~mv2.jpeg/v1/fill/w_800,h_500,al_c,q_85/cf2b8e_0aff98c1e968414787d3f502cd1603e6~mv2.jpeg",
    excerpt: "El diario La Tercera cubrió nuestro trabajo en una nota especial sobre salud mental comunitaria y el rol de los espacios de escucha en Chile.",
    body: `En febrero de 2025, el diario La Tercera publicó una nota especial sobre el impacto de los Círculos de Escucha en distintas comunidades del país.

La periodista acompañó a uno de nuestros círculos en la región Metropolitana y entrevistó a participantes, monitores y a nuestra directora ejecutiva.

**Extracto de la nota:**

*"En un país donde el acceso a salud mental sigue siendo un privilegio, los Círculos de Escucha de Corporación Escuchar llevan once años demostrando que hay otra manera. Sin diagnósticos, sin recetas, sin jerarquías. Solo personas escuchándose."*

La cobertura generó cientos de consultas de personas interesadas en participar y de voluntarios que querían formarse como monitores.`,
    featured: false,
    published: true,
    author: "Comunicaciones Escuchar",
  },
  {
    id: "5",
    title: "FECU Social 2024: Transparencia total de nuestro trabajo",
    category: "reporte",
    date: "2025-01-30",
    cover_url: "https://static.wixstatic.com/media/cf2b8e_9868894826c4477cb8df0dee04c1ba37~mv2.jpg/v1/fill/w_800,h_500,al_c,q_85/cf2b8e_9868894826c4477cb8df0dee04c1ba37~mv2.jpg",
    excerpt: "Publicamos nuestra FECU Social 2024: personas alcanzadas, monitores formados, uso de fondos y proyecciones para 2025.",
    body: `Como corporación sin fines de lucro, la transparencia es uno de nuestros valores fundamentales. Por eso publicamos anualmente nuestra FECU Social.

**FECU Social 2024 — Resumen:**

- 📊 **Personas alcanzadas**: 1.240 en 2024
- 🎓 **Monitores formados**: 38 nuevos voluntarios certificados
- 🗺️ **Territorios**: 12 comunas de la RM + 3 regiones
- 💰 **Uso de fondos**: 78% programa directo, 12% formación, 10% administración

**Documentos disponibles:**
Escríbenos a hola@corporacionescuchar.cl para solicitar la FECU Social completa, Memoria Anual o Estados Financieros 2024.`,
    featured: false,
    published: true,
    author: "Corporación Escuchar",
  },
  {
    id: "6",
    title: "150 monitores certificados: una red que escucha en todo Chile",
    category: "logro",
    date: "2024-12-05",
    cover_url: "https://static.wixstatic.com/media/cf2b8e_0aff98c1e968414787d3f502cd1603e6~mv2.jpeg/v1/fill/w_800,h_500,al_c,q_85/cf2b8e_0aff98c1e968414787d3f502cd1603e6~mv2.jpeg",
    excerpt: "Certificamos nuestra cohorte 12 llegando a los 150 monitores voluntarios activos. Una red humana que sostiene los Círculos en todo el país.",
    body: `En diciembre de 2024 realizamos la ceremonia de certificación de nuestra cohorte número 12. Con ella, llegamos a los 150 monitores activos en Chile.

**¿Qué es un monitor de Círculo de Escucha?**

Es una persona que se forma durante 3 meses para facilitar espacios de escucha genuina. No son terapeutas ni consejeros: son escuchas entrenados que crean el ambiente para que la magia del círculo ocurra.

**La cohorte 12:**
- 38 nuevos monitores certificados
- De 8 comunas distintas
- Rango de edad: 22 a 67 años
- 71% mujeres

Cada monitor certificado es una nueva posibilidad de que alguien, en algún rincón de Chile, sea escuchado.`,
    featured: false,
    published: true,
    author: "Equipo Formación",
  },
  {
    id: "7",
    title: "CNN Chile: 'La escucha como medicina comunitaria'",
    category: "prensa",
    date: "2024-10-18",
    cover_url: "https://static.wixstatic.com/media/cf2b8e_fe109ead2ca942babb72a4f947d2ea89~mv2.jpeg/v1/fill/w_800,h_500,al_c,q_85/cf2b8e_fe109ead2ca942babb72a4f947d2ea89~mv2.jpeg",
    excerpt: "Nuestra directora fue entrevistada en CNN Chile sobre salud mental comunitaria y el modelo de los Círculos de Escucha.",
    body: `En octubre de 2024, nuestra directora ejecutiva fue invitada al noticiero de CNN Chile para hablar sobre el modelo de los Círculos de Escucha.

**De la entrevista:**

*"Los Círculos de Escucha no reemplazan a la psicología. La complementan. Hay millones de personas en Chile que nunca van a acceder a un psicólogo, y necesitan un espacio. Nosotros somos ese espacio."*

*"El modelo funciona porque no patologiza. No diagnostica. Solo escucha. Y eso, en sí mismo, es terapéutico."*

La entrevista fue compartida más de 3.000 veces en redes sociales.`,
    featured: false,
    published: true,
    author: "Comunicaciones Escuchar",
  },
  {
    id: "8",
    title: "Los Círculos llegan a La Araucanía: escucha en territorio",
    category: "historia",
    date: "2024-09-02",
    cover_url: "https://static.wixstatic.com/media/cf2b8e_636483e26da6493c9d4390dd6f415131~mv2.jpeg/v1/fill/w_800,h_500,al_c,q_85/cf2b8e_636483e26da6493c9d4390dd6f415131~mv2.jpeg",
    excerpt: "En alianza con organizaciones locales, llevamos los Círculos a comunidades rurales de La Araucanía. Lo que encontramos nos cambió.",
    body: `En septiembre de 2024 realizamos nuestros primeros Círculos en comunidades rurales de La Araucanía, en alianza con organizaciones locales de la región.

Lo que encontramos nos cambió.

Las personas traían cargas distintas a las de Santiago: el conflicto territorial, la pérdida, la migración forzada. Pero el modelo funcionó igual. Porque la necesidad de ser escuchado no tiene fronteras geográficas.

**Lo que aprendimos:**

El facilitador local hace toda la diferencia. Formamos a 4 monitores de la región antes de comenzar, con arraigo y confianza en sus comunidades. El idioma no fue barrera. La escucha es universal.

Hoy tenemos 2 círculos semanales activos en la región, con lista de espera.`,
    featured: false,
    published: true,
    author: "Equipo Territorios",
  },
];
