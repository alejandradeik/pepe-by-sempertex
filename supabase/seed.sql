-- ============================================================
-- Pepe — Seed Data v2 (approved Colombian suppliers)
-- ============================================================
-- Run after both migrations.
-- All suppliers are fictional demo data with realistic COP pricing.
--
-- Pricing guide (Colombia, 2024):
--   Recreacionista (show 2h):    280.000 – 500.000 flat
--   Decoración:                  200.000 – 1.200.000 flat
--   Pastel personalizado:         80.000 – 400.000 flat
--   Pasabocas niños:               7.000 – 13.000 per child
--   Picadas adultos:              15.000 – 28.000 per adult
--   Fotógrafo (3-5h):            280.000 – 750.000 flat
--   Mobiliario (por pax):          7.000 – 15.000 per person
--   Souvenirs:                     5.000 – 18.000 per child

truncate public.supplier_profiles restart identity cascade;

insert into public.supplier_profiles
  (business_name, contact_name, email, phone, city,
   service_categories, price_range_min, price_range_max,
   pricing_model, price_per_unit, max_capacity,
   description, instagram_url, website_url, years_experience,
   status, rating, tags)
values

-- ══════════════════════════════════════════════════════════════
-- DECORACIÓN
-- ══════════════════════════════════════════════════════════════

('Magia en Globos',
 'Sandra Rueda', 'sandra@magiaenglobos.co', '3001234001', 'Bogotá',
 '{decoracion}', 180000, 650000, 'flat', 0, 150,
 'Decoración con globos y centros de mesa para fiestas infantiles. Especialistas en temas Elmo, Bluey, Peppa Pig, Encanto y Minecraft. Instalación incluida en Bogotá.',
 '@magiaenglobos', 'https://magiaenglobos.co', 6, 'approved', 4.8,
 '{infantil,globos,tematico,Elmo,Bluey,Peppa}'),

('Fiesta & Color',
 'Marcela Ospina', 'marcela@fiestacolor.co', '3101234002', 'Medellín',
 '{decoracion,mobiliario}', 250000, 900000, 'flat', 0, 200,
 'Decoración integral + arriendo de mobiliario para eventos familiares en Medellín. Backdrop personalizado, mesas dulces y ambientación completa.',
 '@fiestacolor', null, 5, 'approved', 4.7,
 '{infantil,familiar,backdrop,mesas_dulces}'),

('Detalles con Amor',
 'Luisa Pérez', 'luisa@detallesconamor.co', '3201234003', 'Bogotá',
 '{decoracion}', 150000, 480000, 'flat', 0, 100,
 'Decoraciones minimalistas y elegantes para reuniones íntimas. Flores de papel, guirnaldas y centros de mesa. Ideal para presupuestos ajustados.',
 '@detallesconamor', null, 3, 'approved', 4.5,
 '{minimalista,economico,baby_shower,bautizo}'),

('Fantasía Eventos',
 'Paola Montoya', 'paola@fantasiaeventos.co', '3051234004', 'Cali',
 '{decoracion}', 350000, 1400000, 'flat', 0, 300,
 'Decoración premium con flores naturales, telas, luces LED y arcos florales. Para eventos de alto impacto en Cali y Valle del Cauca.',
 '@fantasiaeventos', 'https://fantasiaeventos.co', 9, 'approved', 4.9,
 '{premium,flores,luces,comunion,quinces}'),

('Globos y Sueños',
 'Camila Torres', 'cami@globosysue.co', '3111234005', 'Bucaramanga',
 '{decoracion}', 120000, 380000, 'flat', 0, 80,
 'Arcos, columnas y cortinas de globos para toda ocasión en Bucaramanga. Entrega e instalación incluida en el área metropolitana.',
 '@globosysue', null, 3, 'approved', 4.4,
 '{globos,economico,infantil}'),

('La Maison Eventos',
 'Verónica Salcedo', 'vero@lamaisoneventos.co', '3168901234', 'Bogotá',
 '{decoracion,mobiliario}', 400000, 1800000, 'flat', 0, 400,
 'Studio de diseño de eventos con estética francesa. Flores premium, vajilla de porcelana, candelabros y ambientes de lujo para primera comunión, bautizos y quinceañeras.',
 '@lamaisoneventos', 'https://lamaisoneventos.co', 12, 'approved', 5.0,
 '{premium,lujo,comunion,quinces,bautizo}'),

('ColorBoom Studio',
 'Felipe Arenas', 'hola@colorboom.co', '3124567890', 'Barranquilla',
 '{decoracion}', 200000, 700000, 'flat', 0, 150,
 'Decoración temática tropical y caribeña para fiestas en Barranquilla y Costa. Colores vibrantes, palmas, flores tropicales y ambiente costeño.',
 '@colorboomstudio', null, 4, 'approved', 4.6,
 '{tropical,costeno,infantil,baby_shower}'),

-- ══════════════════════════════════════════════════════════════
-- RECREACIONISTAS
-- ══════════════════════════════════════════════════════════════

('Show del Payaso Glofy',
 'Juan Gómez', 'juan@glofyshow.co', '3151234006', 'Bogotá',
 '{recreacionista}', 280000, 420000, 'flat', 0, 50,
 'Payaso con show de magia, globoflexia y juegos interactivos para niños de 1 a 10 años. 90 minutos garantizados. Disponible fines de semana y festivos.',
 '@glofyshow', null, 7, 'approved', 4.9,
 '{payaso,magia,globoflexia,1-10anios}'),

('Mundo Mágico Kids',
 'Andrea Castro', 'andrea@mundomagicokids.co', '3061234008', 'Bogotá',
 '{recreacionista}', 320000, 550000, 'flat', 0, 60,
 'Show temático completo con personaje disfrazado, bailarines y espectáculo de burbujas. Personajes: Elmo, Bluey, Encanto, Paw Patrol, Moana, Spiderman.',
 '@mundomagicokids', 'https://mundomagicokids.co', 6, 'approved', 4.8,
 '{personajes,tematico,Elmo,Bluey,Paw_Patrol,Encanto}'),

('Recreaciones Alegría',
 'Diana Vargas', 'diana@recreacionesalegria.co', '3201234007', 'Medellín',
 '{recreacionista}', 260000, 400000, 'flat', 0, 60,
 'Equipo de recreacionistas con juegos, baile y actividades para grupos de 15 a 60 niños. Antioquia y área metro. 2 horas de show.',
 '@recreacionesalegria', null, 6, 'approved', 4.7,
 '{equipo,baile,juegos,grupal}'),

('Diversión Total',
 'Carlos Ríos', 'carlos@diversiontotal.co', '3141234009', 'Cali',
 '{recreacionista}', 240000, 380000, 'flat', 0, 50,
 'Animadores con piñata incluida, juegos de piso, concursos y música. Cali y municipios. 2 horas de entretenimiento para toda la familia.',
 '@diversiontotal', null, 4, 'approved', 4.5,
 '{pinata,juegos,familiar,economico}'),

('La Casa de los Juegos',
 'Simón Arango', 'simon@casajuegos.co', '3041234010', 'Barranquilla',
 '{recreacionista}', 280000, 450000, 'flat', 0, 80,
 'Recreacionistas + inflables y juegos interactivos en Barranquilla. Paquetes para grupos de 20 a 80 niños. El inflable se instala en el lugar del evento.',
 '@casajuegos', null, 5, 'approved', 4.6,
 '{inflables,costaño,grupal}'),

('MagicLand Entretenimiento',
 'Stephanie Uribe', 'steph@magicland.co', '3209876543', 'Bogotá',
 '{recreacionista}', 380000, 620000, 'flat', 0, 70,
 'Entretenimiento premium: personajes interactivos, coreografía, karaoke infantil y photobooth. El show más completo de Bogotá para fiestas memorables.',
 '@magiclandco', 'https://magicland.co', 8, 'approved', 4.9,
 '{premium,personajes,karaoke,photobooth,Elmo}'),

-- ══════════════════════════════════════════════════════════════
-- REPOSTERÍA / PASTELES
-- ══════════════════════════════════════════════════════════════

('Dulce Arte Pasteles',
 'Valentina Niño', 'vale@dulceartepasteles.co', '3101234011', 'Bogotá',
 '{pastel}', 90000, 320000, 'flat', 0, null,
 'Tortas personalizadas en fondant para fiestas infantiles. Temas: Elmo, Bluey, Peppa, dinosaurios, princesas. Cupcakes y cake pops a pedido. Entrega en Bogotá.',
 '@dulceartepasteles', null, 5, 'approved', 4.8,
 '{fondant,infantil,Elmo,Bluey,personalizado}'),

('Sabores Especiales',
 'Beatriz Lara', 'bea@saboresespeciales.co', '3201234012', 'Medellín',
 '{pastel}', 75000, 260000, 'flat', 0, null,
 'Pasteles artesanales en buttercream para todo tipo de celebración. Sabores: vainilla, chocolate belga, fresas con crema, oreo, tres leches. Diseños personalizados.',
 '@saboresespeciales', null, 4, 'approved', 4.7,
 '{buttercream,artesanal,familiar}'),

('Repostería La Abuela',
 'Rosa Mejía', 'rosa@reposteriaabuela.co', '3161234013', 'Bogotá',
 '{pastel}', 65000, 190000, 'flat', 0, null,
 'Pasteles caseros tradicionales de la mejor calidad. Especialidad en torta de chocolate húmedo, zanahoria y ponqué de mora. 35 años de tradición.',
 '@reposteriaabuela', null, 10, 'approved', 4.6,
 '{tradicional,casero,economico}'),

('Tortas con Magia',
 'Felipe Suárez', 'felipe@tortasconmagia.co', '3111234014', 'Cali',
 '{pastel}', 95000, 380000, 'flat', 0, null,
 'Tortas de diseño exclusivo y temáticas. Personajes del momento: Elmo, Encanto, Paw Patrol, Moana, Cocomelon. También tortas para adultos con diseños modernos.',
 '@tortasconmagia', 'https://tortasconmagia.co', 4, 'approved', 4.9,
 '{fondant,tematico,Elmo,Encanto,Paw_Patrol,premium}'),

('Sugar Rush Bakery',
 'Isabella Ramírez', 'isa@sugarrush.co', '3187654321', 'Bogotá',
 '{pastel}', 120000, 450000, 'flat', 0, null,
 'Repostería artística y cakes de diseño. Especialidad en drip cakes, naked cakes y tortas con flores comestibles. Entrega en Bogotá y Cundinamarca.',
 '@sugarrushbakery', 'https://sugarrush.co', 6, 'approved', 4.9,
 '{premium,artistico,drip,naked_cake,flores}'),

-- ══════════════════════════════════════════════════════════════
-- PASABOCAS PARA NIÑOS  (pricing: per child)
-- ══════════════════════════════════════════════════════════════

('Snacks Felices',
 'Marina Rondón', 'marina@snacksfelices.co', '3051234015', 'Bogotá',
 '{pasabocas_ninos}', 180000, 450000, 'per_child', 8000, null,
 'Combos de pasabocas para niños: chitos, papas, galletas, jugos caja, gummy bears y sorpresa. Presentación en bolsitas temáticas personalizadas. Precio indicado es por niño.',
 '@snacksfelices', null, 3, 'approved', 4.6,
 '{bolsitas,tematico,economico}'),

('Mini Banquetes',
 'Nathaly Cano', 'nathaly@minibanquetes.co', '3181234016', 'Medellín',
 '{pasabocas_ninos}', 210000, 520000, 'per_child', 9500, null,
 'Bandejas de pasabocas dulces y salados para niños: tequeños, papa chips, chitos, jugo y dulces. Servicio de camarero opcional. Precio es por niño.',
 '@minibanquetes', null, 3, 'approved', 4.5,
 '{bandejas,tequenos,medellin}'),

('Meriendas con Amor',
 'Catalina Reyes', 'cata@meriendas.co', '3223456789', 'Bogotá',
 '{pasabocas_ninos}', 250000, 600000, 'per_child', 10000, null,
 'Boxes de merienda premium para niños: mini sándwich, fruta fresca, chocoramo, jugo natural y sorpresa temática. Presentación elegante con caja personalizada.',
 '@meriendasconamor', null, 4, 'approved', 4.7,
 '{premium,box,fruta,tematico}'),

-- ══════════════════════════════════════════════════════════════
-- PICADAS PARA ADULTOS  (pricing: per adult)
-- ══════════════════════════════════════════════════════════════

('El Banquete de Sofía',
 'Sofía Hernández', 'sofia@banquetedesofia.co', '3101234017', 'Bogotá',
 '{picadas_adultos}', 900000, 2100000, 'per_adult', 18000, null,
 'Tablas de quesos, embutidos importados, frutas y frutos secos. Servicio de camarero y cócteles mocktail opcionales. Precio es por adulto.',
 '@banquetedesofia', 'https://banquetedesofia.co', 6, 'approved', 4.8,
 '{tablas,quesos,premium,mocktail}'),

('Catering Ligero Bogotá',
 'Rodrigo Parra', 'rodrigo@cateringlb.co', '3151234018', 'Bogotá',
 '{picadas_adultos}', 720000, 1680000, 'per_adult', 15000, null,
 'Servicio de catering ligero para adultos: arepas con hogao, tequeños, mini empanadas y refrescos. Estilo colombiano auténtico. Precio por adulto.',
 '@cateringlb', null, 7, 'approved', 4.7,
 '{colombiano,arepas,tequenos,empanadas}'),

('Sabor Antioqueño',
 'Gloria Zapata', 'gloria@saborantioq.co', '3201234019', 'Medellín',
 '{picadas_adultos}', 840000, 1800000, 'per_adult', 17000, null,
 'Picadas típicas antioqueñas: chicharrón, morcilla, chorizo criollo, papa criolla y mazorca. Servicio a domicilio en Medellín y área metro. Precio por adulto.',
 '@saborantioq', null, 9, 'approved', 4.9,
 '{antioqueno,tradicional,paisa}'),

('Mesa de Sabores Cali',
 'Héctor Varón', 'hector@mesasabores.co', '3061234020', 'Cali',
 '{picadas_adultos}', 660000, 1500000, 'per_adult', 14000, null,
 'Tablas temáticas de snacks premium para adultos: chorizos caleños, patacones, aborrajados y queso frito. Presentación en tablas de madera. Precio por adulto.',
 '@mesasaborescali', null, 4, 'approved', 4.5,
 '{caleño,tradicional,tablas}'),

('Gourmet Snacks Co.',
 'Marcela Vidal', 'marcela@gourmetsnacks.co', '3145678901', 'Bogotá',
 '{picadas_adultos}', 960000, 2400000, 'per_adult', 20000, null,
 'Catering gourmet para adultos: tabla ibérica, bruschetta, croquetas, mini quiches y sangría sin alcohol. Presentación premium con menaje incluido.',
 '@gourmetsnacksco', 'https://gourmetsnacks.co', 5, 'approved', 4.8,
 '{gourmet,premium,iberico,brunch}'),

-- ══════════════════════════════════════════════════════════════
-- MOBILIARIO  (pricing: per person — sillas + mesas)
-- ══════════════════════════════════════════════════════════════

('Arriendo Chic',
 'Laura Bernal', 'laura@arriendochic.co', '3121234021', 'Bogotá',
 '{mobiliario}', 350000, 1200000, 'per_person', 9000, 200,
 'Alquiler de sillas Tiffany, mesas redondas y cuadradas, manteles y cubretodo. Entrega, instalación y recogida incluidos en Bogotá. Precio por persona.',
 '@arriendochic', null, 8, 'approved', 4.6,
 '{tiffany,mesas,manteles}'),

('EventMobil Medellín',
 'José Pineda', 'jose@eventmobil.co', '3181234022', 'Medellín',
 '{mobiliario}', 280000, 950000, 'per_person', 7500, 250,
 'Arriendo de sillas Tiffany, crossback y mesas de distintos tamaños en Medellín. También disponibles barras de servicio y lounge muebles.',
 '@eventmobil', null, 6, 'approved', 4.5,
 '{tiffany,crossback,lounge}'),

('Sillas & Más Bogotá',
 'Tatiana Varón', 'tati@sillasymas.co', '3234567890', 'Bogotá',
 '{mobiliario}', 300000, 1000000, 'per_person', 8000, 300,
 'La más completa selección de mobiliario para eventos en Bogotá: sillas plegables, Tiffany, Chiavari y mesas de 4, 6 y 8 puestos. Manteles en todos los colores.',
 '@sillasymasbog', 'https://sillasymas.co', 10, 'approved', 4.7,
 '{variedad,bogota,manteles,plegable}'),

-- ══════════════════════════════════════════════════════════════
-- FOTOGRAFÍA
-- ══════════════════════════════════════════════════════════════

('Instantes Mágicos',
 'Alejandro Mora', 'alejandro@instantesmagicos.co', '3101234023', 'Bogotá',
 '{fotografo}', 280000, 750000, 'flat', 0, null,
 'Fotografía y video de eventos infantiles. Cobertura de 3 a 5 horas. Galería digital entregada en 5 días hábiles. Reels para Instagram incluidos en paquetes premium.',
 '@instantesmagicos', 'https://instantesmagicos.co', 7, 'approved', 4.9,
 '{video,reels,infantil,digital}'),

('Recuerdos en Foco',
 'Tatiana López', 'tati@recuerdosenfoco.co', '3141234024', 'Medellín',
 '{fotografo}', 260000, 650000, 'flat', 0, null,
 'Fotografía profesional para fiestas y eventos familiares en Medellín. Cobertura de 3 a 5 horas. Entrega en álbum digital y 20 fotos impresas en paquetes completos.',
 '@recuerdosenfoco', null, 5, 'approved', 4.7,
 '{familiar,impresiones,album}'),

('Click & Go Photos',
 'David Medina', 'david@clickgophotos.co', '3051234025', 'Cali',
 '{fotografo}', 240000, 580000, 'flat', 0, null,
 'Fotografía para eventos en Cali con edición express. Primeras 30 fotos editadas entregadas el mismo día vía WhatsApp. Ideal para familias que quieren compartir de inmediato.',
 '@clickgophotos', null, 4, 'approved', 4.6,
 '{express,cali,whatsapp}'),

('LuzArte Fotografía',
 'Natalia Cárdenas', 'nata@luzarte.co', '3198765432', 'Bogotá',
 '{fotografo}', 350000, 900000, 'flat', 0, null,
 'Fotografía de autor para eventos. Estilo editorial y documental. Cobertura de hasta 6 horas, drone opcional, álbum impreso premium y reel cinematográfico.',
 '@luzartefo', 'https://luzarte.co', 9, 'approved', 5.0,
 '{premium,editorial,drone,cinematico}'),

-- ══════════════════════════════════════════════════════════════
-- SOUVENIRS  (pricing: per child)
-- ══════════════════════════════════════════════════════════════

('Recuerditos con Amor',
 'Ana Montiel', 'ana@recuerditos.co', '3161234026', 'Bogotá',
 '{souvenirs}', 180000, 450000, 'per_child', 7000, null,
 'Souvenirs personalizados para eventos infantiles: bolsitas con dulces y juguete, libretas, lápices y stickers. Mínimo 20 unidades. Diseño del tema del evento incluido.',
 '@recuerditos', null, 5, 'approved', 4.7,
 '{bolsitas,dulces,infantil,tematico}'),

('Detalles del Corazón',
 'Patricia Ossa', 'paty@detallescorazon.co', '3201234027', 'Medellín',
 '{souvenirs}', 120000, 360000, 'per_child', 6000, null,
 'Recuerdos temáticos para baby showers, cumpleaños y bautizos. Personalización con nombre y fecha incluida. Envío a toda Antioquia. Mínimo 20 unidades.',
 '@detallescorazon', null, 4, 'approved', 4.5,
 '{baby_shower,bautizo,personalizado}'),

('Souvenir Studio',
 'Manuela Giraldo', 'manu@souvenierstudio.co', '3111234028', 'Bogotá',
 '{souvenirs}', 240000, 600000, 'per_child', 9500, null,
 'Souvenirs premium: cajitas personalizadas con vela aromática, jabón artesanal, confites y tarjeta. Presentación de lujo. Mínimo 15 unidades. Envío a toda Colombia.',
 '@souvenierstudio', 'https://souvenierstudio.co', 6, 'approved', 4.8,
 '{premium,aromatico,caja,lujo}'),

-- ══════════════════════════════════════════════════════════════
-- MULTI-CATEGORÍA (proveedores que ofrecen varios servicios)
-- ══════════════════════════════════════════════════════════════

('Todo para tu Fiesta',
 'Carmen Ávila', 'carmen@todoparartufiesta.co', '3179876543', 'Bogotá',
 '{decoracion,pasabocas_ninos,souvenirs}', 350000, 1100000, 'flat', 0, 120,
 'Paquete integral: decoración + pasabocas para niños + souvenirs. Ideal para cumpleaños infantiles en Bogotá. Coordinamos todo para que no tengas que hablar con múltiples proveedores.',
 '@todoparatufiesta', 'https://todoparatufiesta.co', 7, 'approved', 4.8,
 '{paquete,integral,economico,infantil}'),

('Celebraciones Feliz',
 'Rodrigo Salazar', 'rodrigo@celebracionesfeliz.co', '3134567890', 'Medellín',
 '{decoracion,pasabocas_ninos,souvenirs}', 320000, 980000, 'flat', 0, 100,
 'Todo en uno para fiestas infantiles en Medellín: decoración temática, kit de pasabocas por niño y souvenir personalizado. Coordinación total del evento.',
 '@celebracionesfeliz', null, 5, 'approved', 4.6,
 '{paquete,integral,medellin}'),

('Party Gourmet',
 'Isabella Correa', 'isa@partygourmet.co', '3156789012', 'Bogotá',
 '{picadas_adultos,pasabocas_ninos}', 600000, 2000000, 'flat', 0, 150,
 'Catering completo para toda la familia: picadas para adultos + pasabocas para niños. Menú balanceado para ambas audiencias. Precio total incluye ambos servicios.',
 '@partygourmet', 'https://partygourmet.co', 8, 'approved', 4.7,
 '{familiar,catering_completo,premium}'),

('Eventos Integrados SAS',
 'Tomás Herrera', 'tomas@eventosintegrados.co', '3167890123', 'Bogotá',
 '{decoracion,mobiliario,fotografo}', 700000, 2500000, 'flat', 0, 250,
 'Paquete premium: decoración + mobiliario completo + fotografía. Una sola coordinación para los tres servicios principales. Descuento del 15% vs contratar por separado.',
 '@eventosintegrados', 'https://eventosintegrados.co', 11, 'approved', 4.8,
 '{premium,paquete,descuento,coordinado}'),

-- ══════════════════════════════════════════════════════════════
-- CIUDADES ADICIONALES
-- ══════════════════════════════════════════════════════════════

('Pereira Fiestas',
 'Sandra Meza', 'sandra@pereirafiestas.co', '3101122334', 'Pereira',
 '{decoracion,recreacionista}', 300000, 850000, 'flat', 0, 100,
 'Decoración y recreación todo en uno para fiestas en Pereira y el Eje Cafetero. Más de 200 eventos organizados en el departamento.',
 '@pereirafiestas', null, 6, 'approved', 4.6,
 '{pereira,integral,eje_cafetero}'),

('Dulces Recuerdos Cali',
 'María Clara Pinto', 'mclara@dulcesrecuerdos.co', '3059876543', 'Cali',
 '{pastel,souvenirs}', 200000, 680000, 'flat', 0, null,
 'Tortas y souvenirs coordinados con el mismo tema para fiestas en Cali. Diseño unificado para pastel y recuerdos. Ahorra tiempo hablando con un solo proveedor.',
 '@dulcesrecuerdoscali', null, 4, 'approved', 4.7,
 '{cali,unificado,tematico}'),

('Cartagena Events',
 'Jorge Nieto', 'jorge@cartagenaevents.co', '3053456789', 'Cartagena',
 '{decoracion,fotografo}', 450000, 1600000, 'flat', 0, 200,
 'Eventos con ambiente caribeño en Cartagena. Decoración colonial con flores tropicales y fotografía documental. Ideal para fiestas al aire libre y en playa.',
 '@cartagenaevents', 'https://cartagenaevents.co', 8, 'approved', 4.8,
 '{caribeno,playa,colonial,tropical}'),

('Manizales Celebra',
 'Andrea Salazar', 'andrea@manizalescelebra.co', '3168765432', 'Manizales',
 '{decoracion,pastel}', 220000, 720000, 'flat', 0, 100,
 'Decoración y repostería para eventos en Manizales y Caldas. Especialidad en tortas de café colombiano y decoraciones con flores de colores cafeteros.',
 '@manizalescelebra', null, 5, 'approved', 4.5,
 '{manizales,cafe,flores,caldas}');
