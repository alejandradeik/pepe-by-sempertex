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
 '{manizales,cafe,flores,caldas}'),

-- ══════════════════════════════════════════════════════════════
-- FLORES
-- ══════════════════════════════════════════════════════════════

('Jardín de Eventos',
 'Catalina Flórez', 'cata@jardindeventos.co', '3101239001', 'Bogotá',
 '{flores}', 180000, 700000, 'flat', 0, null,
 'Arreglos florales naturales para eventos: centros de mesa, coronas, guirnaldas y arcos de flores. Especialidad en peonías, rosas y girasoles. Entrega e instalación en Bogotá.',
 '@jardindeventos', null, 6, 'approved', 4.8,
 '{flores_naturales,centros_mesa,arcos,rosas}'),

('Florería La Primavera',
 'Gloria Moreno', 'gloria@florerialaprimavera.co', '3201239002', 'Medellín',
 '{flores}', 150000, 550000, 'flat', 0, null,
 'Diseño floral para bodas, bautizos y cumpleaños en Medellín. Flores de temporada y exóticas. Paquetes desde bouquets hasta decoración completa.',
 '@laprimeraflores', null, 8, 'approved', 4.7,
 '{bodas,bautizos,exoticas,temporada}'),

-- ══════════════════════════════════════════════════════════════
-- ARCO DE GLOBOS
-- ══════════════════════════════════════════════════════════════

('ArcoBoom Globos',
 'Felipe Cárdenas', 'felipe@arcoboom.co', '3151239003', 'Bogotá',
 '{arco_globos}', 120000, 380000, 'flat', 0, null,
 'Arcos y columnas de globos personalizados para entradas y fondos de eventos. Colores a elección, tamaños desde 1m hasta 4m. Armado en el lugar incluido en Bogotá.',
 '@arcoboom', null, 4, 'approved', 4.6,
 '{arcos,columnas,personalizado,infantil}'),

('Globos Premium Cali',
 'Daniela Muñoz', 'dani@globospremium.co', '3061239004', 'Cali',
 '{arco_globos,decoracion}', 150000, 450000, 'flat', 0, null,
 'Arcos orgánicos de globos y decoración con globos en Cali. Estilo boho, clásico y neón. Armado profesional e instalación incluida en el área metropolitana de Cali.',
 '@globospremiucali', null, 3, 'approved', 4.5,
 '{organico,boho,neon,cali}'),

-- ══════════════════════════════════════════════════════════════
-- DJ / ANIMACIÓN MUSICAL
-- ══════════════════════════════════════════════════════════════

('DJ Fiestazo',
 'Andrés Bermúdez', 'andres@djfiestazo.co', '3111239005', 'Bogotá',
 '{dj_musica}', 350000, 900000, 'flat', 0, null,
 'DJ profesional para todo tipo de eventos. Equipos de sonido Bose incluidos hasta 200 personas. Géneros: vallenato, salsa, pop, reggaeton, electrónica y música infantil.',
 '@djfiestazo', null, 7, 'approved', 4.8,
 '{dj,sonido,vallenato,salsa,reggaeton}'),

('DJ Mix Eventos',
 'Camilo Escobar', 'cami@djmixeventos.co', '3201239006', 'Medellín',
 '{dj_musica,sonido}', 300000, 750000, 'flat', 0, null,
 'DJ + equipo de sonido todo en uno para eventos en Medellín. Animación, karaoke y pistas de baile. Más de 300 eventos realizados en el área metropolitana.',
 '@djmixeventos', null, 5, 'approved', 4.7,
 '{dj,karaoke,animacion,medellin}'),

('Ritmo y Fiesta Barranquilla',
 'Yesid Palomino', 'yesid@rytmofiesta.co', '3041239007', 'Barranquilla',
 '{dj_musica}', 280000, 680000, 'flat', 0, null,
 'DJ costeño especialista en fiestas familiares y corporativas en Barranquilla. Sonido profesional, luces LED y animación incluida. Especialidad en cumbia, vallenato y champeta.',
 '@rytmofiestabaq', null, 6, 'approved', 4.6,
 '{dj,cumbia,vallenato,costeno}'),

-- ══════════════════════════════════════════════════════════════
-- PERSONAJE TEMÁTICO
-- ══════════════════════════════════════════════════════════════

('Personajes Mágicos Colombia',
 'Lorena Santamaría', 'lorena@personajesmagicos.co', '3181239008', 'Bogotá',
 '{personaje_tematico}', 250000, 550000, 'flat', 0, 80,
 'Personajes disfrazados para fiestas infantiles: Elmo, Peppa, Mickey, Bluey, Spiderman, Moana, Encanto y más. Show de 60 min con baile, fotos y juegos.',
 '@personajesmagicoscol', null, 5, 'approved', 4.9,
 '{elmo,peppa,mickey,bluey,spiderman,moana}'),

('Superhéroes & Princesas',
 'Juliana Ospina', 'juli@superheroesprincesas.co', '3121239009', 'Medellín',
 '{personaje_tematico,show_infantil}', 280000, 600000, 'flat', 0, 60,
 'Personajes y shows infantiles en Medellín: princesas Disney, superhéroes Marvel y DC, y villanos divertidos. Show interactivo de 90 minutos con sorpresas.',
 '@superheroesprincesas', 'https://superheroesprincesas.co', 4, 'approved', 4.8,
 '{disney,marvel,dc,princesas,superheroes}'),

-- ══════════════════════════════════════════════════════════════
-- SHOW INFANTIL
-- ══════════════════════════════════════════════════════════════

('Circo Alegre Shows',
 'Mauricio Roa', 'mauri@circoalegre.co', '3161239010', 'Bogotá',
 '{show_infantil}', 300000, 650000, 'flat', 0, 100,
 'Shows de circo para niños: malabares, trapecio bajo, acrobacia y payasada. 90 minutos de espectáculo. Disponible en Bogotá y Cundinamarca.',
 '@circoalegreshows', null, 8, 'approved', 4.7,
 '{circo,malabares,acrobacia,payasos}'),

('Títeres y Maravillas',
 'Helena Nieto', 'helena@titeres.co', '3231239011', 'Bogotá',
 '{show_infantil}', 200000, 420000, 'flat', 0, 50,
 'Teatro de títeres y cuentacuentos para niños de 2 a 8 años. Shows personalizados con el nombre y tema de la fiesta. Ideal para espacios pequeños y reuniones íntimas.',
 '@titresymaravillas', null, 10, 'approved', 4.6,
 '{titeres,cuentacuentos,teatro,pequeños}'),

-- ══════════════════════════════════════════════════════════════
-- PINTUCARITAS
-- ══════════════════════════════════════════════════════════════

('Arte en Tu Cara',
 'Vanessa Torres', 'vane@arteentucara.co', '3101239012', 'Bogotá',
 '{pintucaritas}', 150000, 380000, 'flat', 0, 40,
 'Maquillaje artístico facial para niños. Diseños de animales, superhéroes, princesas, flores y más. Hasta 40 niños por hora. Pigmentos hipoalergénicos certificados.',
 '@arteentucara', null, 5, 'approved', 4.8,
 '{maquillaje,artistico,hipoalergenico,infantil}'),

('Colores Mágicos',
 'Sofía Alvarado', 'sofi@colormagico.co', '3051239013', 'Cali',
 '{pintucaritas}', 120000, 300000, 'flat', 0, 35,
 'Pintucaritas profesional en Cali. Diseños temáticos para cumpleaños infantiles y eventos especiales. Materiales aptos para piel sensible. Hasta 35 niños por evento.',
 '@coloresmagicoscali', null, 3, 'approved', 4.6,
 '{cali,tematico,piel_sensible}'),

-- ══════════════════════════════════════════════════════════════
-- MAGIA
-- ══════════════════════════════════════════════════════════════

('El Gran Mago Sebastián',
 'Sebastián Castro', 'seba@granmago.co', '3141239014', 'Bogotá',
 '{magia}', 280000, 580000, 'flat', 0, 80,
 'Show de magia profesional de 60-90 minutos para niños y adultos. Trucos de ilusionismo, levitación y magia con palomas. Miembro de la Sociedad Colombiana de Magia.',
 '@granmagoseb', null, 12, 'approved', 4.9,
 '{magia,ilusionismo,palomas,profesional}'),

('Abraca & Dabra',
 'Paula Ríos', 'paula@abracadabra.co', '3181239015', 'Medellín',
 '{magia,show_infantil}', 220000, 480000, 'flat', 0, 60,
 'Maga interactiva con show de close-up, cartomagia y magia cómica para niños en Medellín. Show participativo donde los niños son los protagonistas del espectáculo.',
 '@abracadabramag', null, 6, 'approved', 4.7,
 '{close_up,cartomagia,comica,participativo}'),

-- ══════════════════════════════════════════════════════════════
-- VIDEÓGRAFO
-- ══════════════════════════════════════════════════════════════

('Video Memorias',
 'Nicolás Suárez', 'nico@videomemorias.co', '3111239016', 'Bogotá',
 '{videografo}', 320000, 850000, 'flat', 0, null,
 'Videografía profesional para eventos con edición cinematográfica. Video de 3-5 minutos + highlights de 60 segundos para redes sociales. Entrega en 10 días hábiles.',
 '@videomemorias', 'https://videomemorias.co', 6, 'approved', 4.8,
 '{cinematico,highlights,redes,edicion}'),

('Frames & Feelings',
 'Carolina Bermúdez', 'caro@framesandfeelings.co', '3201239017', 'Bogotá',
 '{videografo,fotografo}', 500000, 1400000, 'flat', 0, null,
 'Foto y video profesional en un mismo paquete. Video completo + galería de fotos editadas + reel para Instagram. Cobertura de hasta 6 horas. Entrega en álbum digital premium.',
 '@framesandfeelings', 'https://framesandfeelings.co', 8, 'approved', 4.9,
 '{foto,video,reel,album,premium}'),

-- ══════════════════════════════════════════════════════════════
-- PHOTOBOOTH / CABINA DE FOTOS
-- ══════════════════════════════════════════════════════════════

('Snap! Photo Booth',
 'Alejandro Vélez', 'alejo@snapbooth.co', '3151239018', 'Bogotá',
 '{photobooth}', 350000, 750000, 'flat', 0, null,
 'Cabina fotográfica con impresión instantánea, props temáticos y fondo personalizado. Illimitadas fotos durante el evento. Galería digital compartida por WhatsApp al final.',
 '@snapboothco', 'https://snapbooth.co', 5, 'approved', 4.8,
 '{impresion,props,digital,whatsapp}'),

('Foto Fiesta Colombia',
 'Valentina Muñoz', 'vale@fotofiesta.co', '3041239019', 'Medellín',
 '{photobooth}', 280000, 620000, 'flat', 0, null,
 'Photobooth con cámara profesional, ring light y props divertidos para eventos en Medellín. Marco personalizado con el nombre del evento y QR para descarga inmediata.',
 '@fotofiestaCol', null, 4, 'approved', 4.6,
 '{ring_light,props,qr,descarga}'),

-- ══════════════════════════════════════════════════════════════
-- MESA DE DULCES
-- ══════════════════════════════════════════════════════════════

('Dulce Tentación',
 'María Alejandra Cruz', 'maria@dulcetentacion.co', '3101239020', 'Bogotá',
 '{mesa_dulces}', 280000, 850000, 'flat', 0, null,
 'Mesa de dulces y postres temáticos: cupcakes, macarons, cake pops, chocolates artesanales y algodones. Ambientación con el tema del evento incluida. Bogotá y alrededores.',
 '@dulcetentacion', null, 5, 'approved', 4.8,
 '{cupcakes,macarons,chocolate,tematico}'),

('Sweet Table Studio',
 'Isabela García', 'isa@sweettable.co', '3201239021', 'Medellín',
 '{mesa_dulces,pastel}', 350000, 1000000, 'flat', 0, null,
 'Diseño completo de mesa de dulces más pastel coordinado. Cupcakes, cake pops, bombones y mesa decorada. Todo con el mismo estilo y paleta de colores.',
 '@sweettablestudio', 'https://sweettable.co', 6, 'approved', 4.9,
 '{diseño,coordinado,cupcakes,bombones}'),

-- ══════════════════════════════════════════════════════════════
-- CATERING COMPLETO
-- ══════════════════════════════════════════════════════════════

('Banquetes El Fogón',
 'Roberto Carvajal', 'roberto@elfogon.co', '3171239022', 'Bogotá',
 '{catering_completo}', 1200000, 4000000, 'per_person', 25000, 200,
 'Catering completo para eventos: entrada, sopa, plato fuerte colombiano y postre. Incluye personal de servicio, vajilla y menaje. Menús a medida según el evento.',
 '@elfogoncatering', 'https://elfogon.co', 12, 'approved', 4.7,
 '{completo,colombiano,servicio,vajilla}'),

('Gourmet Events Catering',
 'Lucía Martínez', 'lucia@gourmetevents.co', '3121239023', 'Medellín',
 '{catering_completo,meseros}', 1500000, 5000000, 'per_person', 30000, 150,
 'Catering gourmet con chef a domicilio. Menú de 3 tiempos personalizado, meseros uniformados y montaje de mesas incluido. Ideal para eventos de 30 a 150 personas.',
 '@gourmeteventsmed', 'https://gourmetevents.co', 9, 'approved', 4.8,
 '{chef,gourmet,meseros,personalizado}'),

-- ══════════════════════════════════════════════════════════════
-- BEBIDAS
-- ══════════════════════════════════════════════════════════════

('Bebidas para Eventos',
 'Cristian López', 'cristian@bebidasparaeventos.co', '3141239024', 'Bogotá',
 '{bebidas}', 200000, 800000, 'per_person', 8000, null,
 'Surtido de bebidas frías y calientes para eventos: jugos naturales, gaseosas, agua, café y aromáticas. Neveras y dispensadores incluidos. Servicio por persona.',
 '@bebidasparaeventos', null, 5, 'approved', 4.5,
 '{jugos,naturales,gaseosas,dispensadores}'),

-- ══════════════════════════════════════════════════════════════
-- BARTENDER
-- ══════════════════════════════════════════════════════════════

('Cócteles Colombia',
 'Andrés Giraldo', 'andres@cocteles.co', '3101239025', 'Bogotá',
 '{bartender}', 400000, 1200000, 'flat', 0, 120,
 'Bartender profesional con coctelería sin alcohol y con alcohol. Cócteles artesanales, sangría, mojitos y bebidas especiales. Barra completamente equipada. Hasta 120 personas.',
 '@coctelesCol', null, 7, 'approved', 4.8,
 '{bartender,cocteles,mojitos,sangria}'),

('Bar Móvil Fiestas',
 'Diego Ramírez', 'diego@barmovil.co', '3181239026', 'Medellín',
 '{bartender,bebidas}', 500000, 1500000, 'flat', 0, 150,
 'Bar móvil con bartender, bebidas incluidas y barra decorada para eventos en Medellín. Paquete todo incluido: licor, mixers, hielo, vasos y decoración de la barra.',
 '@barmovilfiestas', null, 5, 'approved', 4.7,
 '{bar_movil,todo_incluido,licor,barra}'),

-- ══════════════════════════════════════════════════════════════
-- CARRITO DE SNACKS
-- ══════════════════════════════════════════════════════════════

('El Carrito Feliz',
 'Paola Ríos', 'paola@carritofeliz.co', '3061239027', 'Bogotá',
 '{carrito_snacks}', 300000, 700000, 'flat', 0, 100,
 'Carrito de crispetas, algodón de azúcar y palomitas temáticas para eventos. Presentación decorada con el tema del evento. Operador incluido durante el evento.',
 '@carritofeliz', null, 4, 'approved', 4.7,
 '{crispetas,algodon,palomitas,tematico}'),

-- ══════════════════════════════════════════════════════════════
-- HELADOS / POSTRES
-- ══════════════════════════════════════════════════════════════

('Helados Artesanales Nieve',
 'Juliana Herrera', 'juli@heladosnieve.co', '3201239028', 'Bogotá',
 '{helados_postres}', 280000, 750000, 'flat', 0, 100,
 'Servicio de heladería artesanal para eventos. Más de 20 sabores incluidos Colombia, paletas de fruta y postres helados. Carrito con operador y materiales incluidos.',
 '@heladosnieve', null, 5, 'approved', 4.8,
 '{artesanal,paletas,fruta,sabores}'),

-- ══════════════════════════════════════════════════════════════
-- MENAJE
-- ══════════════════════════════════════════════════════════════

('Menaje & Eventos',
 'Claudia Escobar', 'claudia@menajeventos.co', '3111239029', 'Bogotá',
 '{menaje}', 200000, 800000, 'per_person', 5000, 300,
 'Alquiler de vajilla, copas, cubiertos y mantelería para eventos. Más de 20 diseños de vajilla disponibles. Entrega, instalación y recogida incluidos en Bogotá.',
 '@menajeventos', null, 8, 'approved', 4.5,
 '{vajilla,copas,cubiertos,manteleria}'),

-- ══════════════════════════════════════════════════════════════
-- INFLABLES
-- ══════════════════════════════════════════════════════════════

('Inflables Divertidos',
 'Hernán Guerrero', 'hernan@inflablediver.co', '3141239030', 'Bogotá',
 '{inflables}', 200000, 550000, 'flat', 0, 50,
 'Alquiler de castillos y toboganes inflables para fiestas infantiles en Bogotá. Instalación y vigilancia durante el evento incluidos. Limpieza y desinfección garantizada.',
 '@inflablediver', null, 6, 'approved', 4.6,
 '{castillo,tobogan,infantil,vigilancia}'),

('Aventura Inflable Medellín',
 'Patricia Castillo', 'paty@aventurainflable.co', '3181239031', 'Medellín',
 '{inflables}', 180000, 480000, 'flat', 0, 40,
 'Arriendo de inflables temáticos en Medellín: castillos, toboganes, piscinas de pelotas y obstáculos. Transporte e instalación incluida. Disponible fines de semana.',
 '@aventurainflable', null, 4, 'approved', 4.5,
 '{tematico,tobogan,piscina_pelotas,obstaculos}'),

-- ══════════════════════════════════════════════════════════════
-- SONIDO
-- ══════════════════════════════════════════════════════════════

('Sonido Pro Eventos',
 'Mauricio Salcedo', 'mauri@sonidopro.co', '3101239032', 'Bogotá',
 '{sonido}', 250000, 700000, 'flat', 0, 300,
 'Sistema de sonido profesional para eventos de 50 a 300 personas. Parlantes JBL, subwoofer, micrófonos inalámbricos y operador técnico incluidos. Bogotá y alrededores.',
 '@sonidoproeventos', null, 9, 'approved', 4.7,
 '{jbl,microfonos,inalambrico,tecnico}'),

-- ══════════════════════════════════════════════════════════════
-- ILUMINACIÓN
-- ══════════════════════════════════════════════════════════════

('Luz & Ambiente',
 'Diego Morales', 'diego@luzambiente.co', '3151239033', 'Bogotá',
 '{iluminacion}', 300000, 900000, 'flat', 0, 200,
 'Diseño de iluminación para eventos: luces LED de colores, pistas de baile iluminadas, proyectores y efectos especiales. Instalación y operación durante el evento incluidas.',
 '@luzambiente', null, 7, 'approved', 4.8,
 '{led,pista_baile,proyectores,efectos}'),

-- ══════════════════════════════════════════════════════════════
-- MESEROS
-- ══════════════════════════════════════════════════════════════

('Servicio de Meseros Elite',
 'Sandra Moreno', 'sandra@meseroselite.co', '3201239034', 'Bogotá',
 '{meseros}', 300000, 900000, 'per_person', 15000, null,
 'Meseros uniformados para eventos de 30 a 200 personas. Servicio de mesa, bandeja y coctelería. Supervisión incluida. Bogotá y área metropolitana. Precio por mesero/hora.',
 '@meseroselite', null, 10, 'approved', 4.7,
 '{uniformados,supervision,bandeja,coktail}'),

-- ══════════════════════════════════════════════════════════════
-- TRANSPORTE
-- ══════════════════════════════════════════════════════════════

('Transporte Eventos Colombia',
 'Jhon Rojas', 'jhon@transporteeventos.co', '3121239035', 'Bogotá',
 '{transporte}', 200000, 800000, 'flat', 0, 50,
 'Transporte de invitados y proveedores para eventos en Bogotá y municipios. Vans, microbuses y busetas disponibles. Conductores profesionales con seguro de pasajeros.',
 '@transporteeventoscol', null, 6, 'approved', 4.5,
 '{van,microbus,profesional,seguro}'),

-- ══════════════════════════════════════════════════════════════
-- COORDINADOR
-- ══════════════════════════════════════════════════════════════

('Coordinación de Eventos Plus',
 'Marcela Rivera', 'marcela@coordeventos.co', '3161239036', 'Bogotá',
 '{coordinador}', 400000, 1200000, 'flat', 0, null,
 'Coordinación logística integral el día del evento. Gestión de proveedores, línea de tiempo, montaje y desmontaje. Experiencia en más de 500 eventos en Colombia.',
 '@coordeventosplus', 'https://coordeventos.co', 10, 'approved', 4.9,
 '{coordinacion,logistica,timeline,500eventos}'),

-- ══════════════════════════════════════════════════════════════
-- PIÑATA
-- ══════════════════════════════════════════════════════════════

('Piñatas Creativas',
 'Ángela Pedraza', 'angela@piñatascreativas.co', '3101239037', 'Bogotá',
 '{pinata}', 60000, 200000, 'flat', 0, null,
 'Piñatas artesanales personalizadas para fiestas infantiles. Personajes: Elmo, Bluey, Peppa, Dinosaurios, Unicornio y más. Dulces incluidos en paquetes completos.',
 '@pinatascreativas', null, 5, 'approved', 4.6,
 '{artesanal,personalizado,dulces,infantil}'),

('Fábrica de Piñatas Medellín',
 'Gustavo Arango', 'gus@fabricapinatas.co', '3201239038', 'Medellín',
 '{pinata}', 50000, 170000, 'flat', 0, null,
 'Piñatas en cartón y tela de todo tipo de personajes. Envío a toda Colombia. Mínimo 3 días de anticipación. Dulces y confites a parte o en paquete.',
 '@fabricapinatasMed', null, 8, 'approved', 4.5,
 '{carton,tela,envio_colombia,economico}'),

-- ══════════════════════════════════════════════════════════════
-- INVITACIONES
-- ══════════════════════════════════════════════════════════════

('Invita.co Studio',
 'Laura Sánchez', 'laura@invita.co', '3141239039', 'Bogotá',
 '{invitaciones}', 50000, 250000, 'flat', 0, null,
 'Invitaciones digitales animadas y físicas personalizadas para todo tipo de evento. Video-invitación con música, RSVP digital y recordatorio automático incluido.',
 '@invitaco', 'https://invita.co', 4, 'approved', 4.7,
 '{digital,animada,rsvp,recordatorio}'),

('Papelería & Diseño Eventos',
 'Valentina Pardo', 'valen@papeleriaeventos.co', '3181239040', 'Bogotá',
 '{invitaciones}', 80000, 350000, 'flat', 0, null,
 'Invitaciones físicas impresas + digital para eventos. Diseños exclusivos en papel premium, laminado y con detalles dorados o plateados. Envío a toda Colombia.',
 '@papeleriaeventos', null, 6, 'approved', 4.6,
 '{fisicas,impresas,premium,dorado}');

-- ============================================================
-- SEED v3 — Cobertura completa por ciudad y categoría
-- ============================================================
-- Este bloque completa las combinaciones ciudad+servicio faltantes
-- para que el cotizador nunca devuelva "Sin proveedor disponible".
--
-- Ciudades cubiertas: Bogotá, Medellín, Cali, Barranquilla,
--   Cartagena, Bucaramanga, Pereira, Manizales
-- Categorías nuevas: recordatorios_digitales, detalles_mesa,
--   algodon_azucar, seguridad, limpieza
-- ============================================================

insert into public.supplier_profiles
  (business_name, contact_name, email, phone, city,
   service_categories, price_range_min, price_range_max,
   pricing_model, price_per_unit, max_capacity,
   description, instagram_url, website_url, years_experience,
   status, rating, tags)
values

-- ══════════════════════════════════════════════════════════════
-- NUEVOS TIPOS: recordatorios_digitales
-- ══════════════════════════════════════════════════════════════

('RecuérdaMe Digital',
 'Paola Suárez', 'paola@recuerdame.co', '3001240001', 'Bogotá',
 '{recordatorios_digitales,invitaciones}', 40000, 180000, 'flat', 0, null,
 'Recordatorios digitales animados para WhatsApp: cuenta regresiva del evento, datos de acceso y mapa. Entrega en 24h. Personalización total con fotos y colores del evento.',
 '@recuerdamedigital', null, 3, 'approved', 4.7,
 '{digital,whatsapp,animado,recordatorio}'),

('AnimaEvent Studio',
 'Sebastián Rojas', 'seba@animaevent.co', '3001240002', 'Bogotá',
 '{recordatorios_digitales}', 35000, 150000, 'flat', 0, null,
 'Studio de motion graphics para eventos: invitaciones en video, recordatorios animados y stories para redes sociales. Entrega express en 12 horas.',
 '@animaeventstudio', null, 4, 'approved', 4.8,
 '{motion,video,stories,express}'),

('Digital Fiesta Colombia',
 'Laura Rincón', 'laura@digitalfiesta.co', '3001240003', 'Medellín',
 '{recordatorios_digitales,invitaciones}', 45000, 200000, 'flat', 0, null,
 'Diseño de piezas digitales para fiestas: recordatorios, save-the-date y agradecimientos post-evento. Servicio a nivel nacional con entrega por email o WhatsApp.',
 '@digitalfiestacol', null, 5, 'approved', 4.6,
 '{nacional,save_the_date,agradecimiento}'),

('Invite & Go Cali',
 'Valentina Lozano', 'vale@inviteandgo.co', '3001240004', 'Cali',
 '{recordatorios_digitales,invitaciones}', 30000, 130000, 'flat', 0, null,
 'Recordatorios y mini-sitios web para eventos en Cali. El invitado puede confirmar asistencia, ver el mapa y guardar la fecha desde el mismo mensaje.',
 '@inviteandgocali', null, 2, 'approved', 4.5,
 '{minisite,rsvp,confirmacion,mapa}'),

-- ══════════════════════════════════════════════════════════════
-- NUEVOS TIPOS: detalles_mesa
-- ══════════════════════════════════════════════════════════════

('Centro & Mesa Bogotá',
 'Adriana Vargas', 'adri@centromesa.co', '3001240005', 'Bogotá',
 '{detalles_mesa,flores}', 120000, 600000, 'flat', 0, null,
 'Centros de mesa florales y decorativos para eventos: arreglos con flores naturales, velas, espejos y portarretratos. Diseño a medida según paleta de colores del evento.',
 '@centromesabog', null, 6, 'approved', 4.8,
 '{centros_mesa,flores,velas,espejos}'),

('Detalles & Estilo',
 'Mónica Herrera', 'moni@detallesestilo.co', '3001240006', 'Bogotá',
 '{detalles_mesa}', 80000, 400000, 'flat', 0, null,
 'Centros de mesa temáticos para fiestas: miniaturas personalizadas, terrariums, flores secas y elementos decorativos coordinados con el tema del evento.',
 '@detallesestilo', null, 4, 'approved', 4.6,
 '{tematico,terrariums,flores_secas,miniaturas}'),

('La Flor de Mesa',
 'Camila Agudelo', 'cami@laflormesa.co', '3001240007', 'Medellín',
 '{detalles_mesa,flores}', 100000, 480000, 'flat', 0, null,
 'Centros de mesa con flores naturales y de temporada en Medellín. Diseño botánico y minimalista. Incluye mantelería coordinada y tarjetas de asiento personalizadas.',
 '@laflormesa', null, 5, 'approved', 4.7,
 '{botanico,minimalista,tarjetas,manteleria}'),

('Ambientes Cali',
 'Daniela Castaño', 'dani@ambientescali.co', '3001240008', 'Cali',
 '{detalles_mesa,decoracion}', 90000, 420000, 'flat', 0, null,
 'Ambientación de mesas para eventos en Cali: centros florales, candelabros, caminos de mesa y detalles personalizados para cada puesto. Estilo tropical y elegante.',
 '@ambientescali', null, 4, 'approved', 4.5,
 '{tropical,candelabros,caminos_mesa,elegante}'),

-- ══════════════════════════════════════════════════════════════
-- NUEVOS TIPOS: algodon_azucar
-- ══════════════════════════════════════════════════════════════

('Nube de Azúcar',
 'Cristina Peña', 'cris@nubeazucar.co', '3001240009', 'Bogotá',
 '{algodon_azucar}', 250000, 650000, 'flat', 0, 100,
 'Máquina de algodón de azúcar artesanal con operador para eventos. Colores personalizados según el tema. También disponible en sabores: fresa, uva, mango y tuttifruti.',
 '@nubeazucar', null, 4, 'approved', 4.8,
 '{algodon,artesanal,colores,sabores}'),

('Dulce Nube Medellín',
 'Jorge Valencia', 'jorge@dulcenube.co', '3001240010', 'Medellín',
 '{algodon_azucar,carrito_snacks}', 220000, 580000, 'flat', 0, 80,
 'Carrito de algodón de azúcar + palomitas para eventos en Medellín. Operador incluido, presentación decorada y empaque personalizado. Ideal para cumpleaños infantiles.',
 '@dulcenubemed', null, 3, 'approved', 4.7,
 '{carrito,palomitas,empaque,infantil}'),

('Caramelito Show',
 'Diana Mendoza', 'diana@caramelito.co', '3001240011', 'Cali',
 '{algodon_azucar}', 200000, 550000, 'flat', 0, 80,
 'Show de algodón de azúcar en Cali: máquina vintage decorada, operador uniformado y presentación con bolsas impresas con el nombre del evento.',
 '@caramelo_show', null, 3, 'approved', 4.6,
 '{vintage,bolsas,impreso,show}'),

('Sweet Cloud Events',
 'Nicolás Bermúdez', 'nico@sweetcloud.co', '3001240012', 'Barranquilla',
 '{algodon_azucar,carrito_snacks}', 230000, 600000, 'flat', 0, 90,
 'Servicio de algodón de azúcar y crispetas para eventos en Barranquilla y la Costa. Carrito caribeño decorado. Disponible en colores pasteles y neón.',
 '@sweetcloudBAQ', null, 2, 'approved', 4.5,
 '{caribeño,pasteles,neon,crispetas}'),

-- ══════════════════════════════════════════════════════════════
-- NUEVOS TIPOS: seguridad
-- ══════════════════════════════════════════════════════════════

('Segurivent Colombia',
 'Carlos Mendoza', 'carlos@segurivent.co', '3001240013', 'Bogotá',
 '{seguridad}', 350000, 1500000, 'flat', 0, 500,
 'Personal de seguridad para eventos sociales y corporativos. Control de acceso, supervisión de invitados y coordinación con autoridades locales. Bogotá y municipios.',
 '@seguriventcol', 'https://segurivent.co', 8, 'approved', 4.6,
 '{control_acceso,supervisores,corporativo,bogota}'),

('VIP Security Events',
 'Andrés Molina', 'andres@vipsecurity.co', '3001240014', 'Bogotá',
 '{seguridad}', 500000, 2000000, 'flat', 0, 1000,
 'Seguridad privada premium para eventos de alto perfil. Personal uniformado, comunicación por radio y coordinación total. Experiencia en quinceañeras, bodas y eventos corporativos.',
 '@vipsecurityco', null, 12, 'approved', 4.8,
 '{premium,uniformado,radio,quinces,bodas}'),

('Guard Pro Medellín',
 'Fabián Ríos', 'fabian@guardpro.co', '3001240015', 'Medellín',
 '{seguridad}', 300000, 1200000, 'flat', 0, 300,
 'Empresa de seguridad para eventos en Medellín y Antioquia. Control de acceso, parqueadero y supervisión de personal. Certificados por Superintendencia de Vigilancia.',
 '@guardpromed', null, 6, 'approved', 4.5,
 '{certificado,parqueadero,antioquia,supervision}'),

('Costa Segura Eventos',
 'Roberto Álvarez', 'roberto@costasegura.co', '3001240016', 'Barranquilla',
 '{seguridad}', 280000, 1000000, 'flat', 0, 400,
 'Personal de seguridad para eventos en la Costa Caribe. Barranquilla, Cartagena y Santa Marta. Control de acceso, wristbands y gestión de aforo.',
 '@costaseguraeventos', null, 7, 'approved', 4.6,
 '{costa,wristbands,aforo,caribe}'),

-- ══════════════════════════════════════════════════════════════
-- NUEVOS TIPOS: limpieza
-- ══════════════════════════════════════════════════════════════

('Limpia Fest Bogotá',
 'Sandra Pinzón', 'sandra@limpiafest.co', '3001240017', 'Bogotá',
 '{limpieza}', 200000, 800000, 'flat', 0, null,
 'Servicio de limpieza y desmontaje post-evento en Bogotá. Recolección de basuras, limpieza de salones, baños y áreas comunes. Disponibilidad inmediata al finalizar.',
 '@limpiafestbog', null, 5, 'approved', 4.5,
 '{desmontaje,baños,salones,inmediato}'),

('CleanEvent Pro',
 'Jimena Castro', 'jimena@cleaneventpro.co', '3001240018', 'Bogotá',
 '{limpieza}', 300000, 1000000, 'flat', 0, null,
 'Limpieza profesional para eventos: pre-evento y post-evento. Equipo certificado, productos ecológicos y garantía de salón impecable. Bogotá y alrededores.',
 '@cleaneventpro', 'https://cleaneventpro.co', 7, 'approved', 4.7,
 '{profesional,ecologico,pre_evento,garantia}'),

('Aseo Total Eventos Medellín',
 'Patricia Loaiza', 'paty@aseototal.co', '3001240019', 'Medellín',
 '{limpieza}', 180000, 700000, 'flat', 0, null,
 'Servicio de aseo especializado en eventos en Medellín. Personal uniformado, insumos incluidos y certificado de disposición de residuos. Disponible domingos y festivos.',
 '@aseototaleventos', null, 6, 'approved', 4.4,
 '{uniformado,residuos,festivos,medellin}'),

('Brilla Eventos Cali',
 'Marcela Torres', 'marcela@brillaeventos.co', '3001240020', 'Cali',
 '{limpieza}', 160000, 650000, 'flat', 0, null,
 'Limpieza pre y post-evento en Cali. Barrido, trapeo, limpieza de cocina y manejo de basuras. Equipo de 2 a 8 personas según el tamaño del evento.',
 '@brillaeventoscali', null, 4, 'approved', 4.3,
 '{pre_evento,cocina,equipo,cali}'),

-- ══════════════════════════════════════════════════════════════
-- SERVICIOS BAJO-REPRESENTADOS — más proveedores para 3 tiers
-- ══════════════════════════════════════════════════════════════

-- carrito_snacks: necesita 2 más
('Carrito Dulce Medellín',
 'Juliana Posada', 'juli@carritodulce.co', '3001240021', 'Medellín',
 '{carrito_snacks,algodon_azucar}', 250000, 680000, 'flat', 0, 90,
 'Carrito de snacks dulces para eventos en Medellín: crispetas, algodón de azúcar, chocorramo y chuches. Decorado con el tema del evento. Operador incluido.',
 '@carritodulcemed', null, 3, 'approved', 4.6,
 '{crispetas,chuches,medellin,infantil}'),

('Snack Rueda Cali',
 'Hernán Patiño', 'hernan@snackrueda.co', '3001240022', 'Cali',
 '{carrito_snacks}', 220000, 620000, 'flat', 0, 80,
 'Carrito de snacks con ruedas estilo vintage para fiestas en Cali. Crispetas gourmet, maíz pira y paletas artesanales. Presentación en bolsas personalizadas.',
 '@snackruedacali', null, 2, 'approved', 4.5,
 '{vintage,gourmet,maiz_pira,paletas}'),

-- helados_postres: necesita 2 más
('Heladería El Polar Medellín',
 'Rodrigo Uribe', 'rodrigo@elpolar.co', '3001240023', 'Medellín',
 '{helados_postres}', 250000, 700000, 'flat', 0, 90,
 'Carrito de helados artesanales para eventos en Medellín. 15 sabores nacionales y exóticos. Paletas de frutas, conos y postres. Operador incluido todo el evento.',
 '@elpolar_med', null, 6, 'approved', 4.7,
 '{artesanal,paletas,conos,sabores}'),

('Postres & Más Cali',
 'Andrea Giraldo', 'andrea@postresmascali.co', '3001240024', 'Cali',
 '{helados_postres,mesa_dulces}', 280000, 780000, 'flat', 0, 100,
 'Mesa de postres helados + dulces para eventos en Cali. Helados, cheesecakes miniatura, brownies y macarons. Presentación elegante con decoración incluida.',
 '@postresymas_cali', null, 4, 'approved', 4.6,
 '{cheesecakes,brownies,macarons,elegante}'),

-- menaje: necesita 2 más
('Vajillas del Pacífico Cali',
 'Beatriz Mosquera', 'bea@vajillaspacifico.co', '3001240025', 'Cali',
 '{menaje,mobiliario}', 180000, 720000, 'per_person', 4500, 280,
 'Alquiler de vajilla, cristalería y mantelería para eventos en Cali. Diseños clásicos y modernos. Servicio de entrega, instalación y recogida. Precio por persona.',
 '@vajillaspacifico', null, 7, 'approved', 4.5,
 '{vajilla,cristaleria,cali,per_person}'),

('Menaje Premium Medellín',
 'Catalina Zapata', 'cata@menajepm.co', '3001240026', 'Medellín',
 '{menaje}', 200000, 800000, 'per_person', 5500, 250,
 'Arriendo de vajilla fina, copas de cristal y cubiertos plateados para eventos en Medellín. Presentación de lujo. Limpieza y empaque incluidos en el servicio.',
 '@menajepm_med', null, 8, 'approved', 4.7,
 '{fino,cristal,plateado,lujo}'),

-- iluminacion: necesita 2 más
('Ilumina Medellín',
 'Tomás Restrepo', 'tomas@iluminamed.co', '3001240027', 'Medellín',
 '{iluminacion,sonido}', 280000, 850000, 'flat', 0, 200,
 'Diseño de iluminación + sonido para eventos en Medellín. Luces de colores, cañones de luz, efectos estroboscópicos y sistema de audio profesional.',
 '@iluminamed', null, 6, 'approved', 4.7,
 '{estroboscopico,colores,audio,medellin}'),

('Luz Caribe Barranquilla',
 'César Palomino', 'cesar@luzcaribe.co', '3001240028', 'Barranquilla',
 '{iluminacion}', 250000, 780000, 'flat', 0, 300,
 'Iluminación para eventos en Barranquilla y la Costa. Leds RGB, luces colgantes, pantallas LED y efectos de humo. Técnico incluido durante el evento.',
 '@luzcaribebaq', null, 5, 'approved', 4.5,
 '{rgb,humo,pantallas,costa}'),

-- transporte: necesita 2 más
('Van-Go Medellín',
 'Miguel Gómez', 'miguel@vangomed.co', '3001240029', 'Medellín',
 '{transporte}', 180000, 720000, 'flat', 0, 45,
 'Transporte de invitados para eventos en Medellín y Antioquia. Vans de 8 y 15 puestos. Conductores con licencia profesional y seguro de pasajeros.',
 '@vangomed', null, 5, 'approved', 4.5,
 '{van,antioquia,licencia,seguro}'),

('Bus Fiesta Colombia',
 'Óscar Trujillo', 'oscar@busfiesta.co', '3001240030', 'Cali',
 '{transporte}', 200000, 900000, 'flat', 0, 60,
 'Transporte para eventos en Cali y el Valle del Cauca. Microbuses de 20 a 60 personas. Conductores uniformados y verificados. Disponible a cualquier hora.',
 '@busfiestacol', null, 7, 'approved', 4.6,
 '{microbus,valle,uniformado,nocturno}'),

-- coordinador: necesita 2 más
('Coordina Eventos Medellín',
 'Alejandra Muñoz', 'ale@coordinaeventos.co', '3001240031', 'Medellín',
 '{coordinador}', 380000, 1100000, 'flat', 0, null,
 'Coordinación completa del día del evento en Medellín. Gestión de proveedores, timeline, protocolo y resolución de imprevistos. Más de 300 eventos coordinados.',
 '@coordinaeventos_med', null, 8, 'approved', 4.8,
 '{gestion,timeline,protocolo,imprevistos}'),

('ProEvent Cali',
 'Lorena Caballero', 'lorena@proeventcali.co', '3001240032', 'Cali',
 '{coordinador}', 350000, 1000000, 'flat', 0, null,
 'Coordinación logística de eventos en Cali. Director de evento, asistente y comunicación directa con todos los proveedores. Reunión previa de planificación incluida.',
 '@proeventcali', null, 6, 'approved', 4.7,
 '{director,asistente,planificacion,cali}'),

-- bebidas: necesita 2 más
('Refrescos Cali Eventos',
 'Gustavo Mosquera', 'gustavo@refrescos.co', '3001240033', 'Cali',
 '{bebidas}', 160000, 650000, 'per_person', 7000, null,
 'Servicio de bebidas para eventos en Cali: jugos de fruta fresca, limonadas naturales, agua, gaseosas y café. Neveras y mesas de servicio incluidas.',
 '@refrescoscali', null, 4, 'approved', 4.4,
 '{jugos,limonada,fresca,cali}'),

('HidraBaq Barranquilla',
 'Natalia Orozco', 'nata@hidrabaq.co', '3001240034', 'Barranquilla',
 '{bebidas,bartender}', 200000, 780000, 'per_person', 8000, null,
 'Bebidas y bar para eventos en Barranquilla: cócteles tropicales, jugos de frutas costeñas y bebidas frías. Perfecto para eventos en la Costa Caribe.',
 '@hidrabaq', null, 3, 'approved', 4.5,
 '{tropicales,costeno,cocteles,baq}'),

-- ══════════════════════════════════════════════════════════════
-- CALI — cobertura de servicios faltantes
-- ══════════════════════════════════════════════════════════════

('Sillas Cali Eventos',
 'Fernando Parra', 'fernando@sillascali.co', '3001240035', 'Cali',
 '{mobiliario}', 270000, 900000, 'per_person', 8500, 300,
 'Arriendo de sillas y mesas para eventos en Cali. Tiffany, plástica y plegable. Mesas redondas, cuadradas y rectangulares. Entrega, instalación y recogida incluidas.',
 '@sillascali', null, 9, 'approved', 4.6,
 '{tiffany,plegable,mesas,cali}'),

('Snack Kids Cali',
 'Mariana Becerra', 'mariana@snackkids.co', '3001240036', 'Cali',
 '{pasabocas_ninos}', 180000, 480000, 'per_child', 8500, null,
 'Pasabocas para niños en Cali: bolsitas con chitos, papas, galletas, jugo y dulce sorpresa. Presentación temática personalizada. Servicio a domicilio.',
 '@snackkidscali', null, 3, 'approved', 4.5,
 '{bolsitas,domicilio,tematico,ninos}'),

('Cinemax Cali Foto-Video',
 'Alejandro Ossa', 'alejo@cinemaxcali.co', '3001240037', 'Cali',
 '{videografo,fotografo}', 300000, 900000, 'flat', 0, null,
 'Fotografía y video profesional para eventos en Cali. Cobertura completa, edición en 7 días y entrega en galería digital. Incluye reel de 60 segundos para Instagram.',
 '@cinemaxcali', null, 5, 'approved', 4.7,
 '{video,foto,reels,galeria}'),

('Foto Cabina Cali',
 'Isabella Reyes', 'isa@fotocabinacali.co', '3001240038', 'Cali',
 '{photobooth}', 280000, 620000, 'flat', 0, null,
 'Cabina de fotos para eventos en Cali. Props incluidos, impresión instantánea, fondo personalizado y galería digital. Atendida por operador todo el evento.',
 '@fotocabinacali', null, 3, 'approved', 4.6,
 '{props,impresion,fondo,operador}'),

('Audio Cali Pro',
 'Mauricio Guerrero', 'mauri@audiocalipro.co', '3001240039', 'Cali',
 '{sonido,dj_musica}', 280000, 780000, 'flat', 0, 250,
 'DJ + equipo de sonido profesional para eventos en Cali. Equipos QSC, mezcla en vivo, micrófonos inalámbricos y repertorio variado: salsa, vallenato, pop y electrónica.',
 '@audiocalipro', null, 7, 'approved', 4.8,
 '{qsc,salsa,vallenato,mezcla_vivo}'),

('Luces & Show Cali',
 'Diego Castaño', 'diego@lucesshowcali.co', '3001240040', 'Cali',
 '{iluminacion}', 270000, 800000, 'flat', 0, 200,
 'Diseño lumínico para eventos en Cali y el Valle. Luces LED, follow spots, gobo proyectores y cabezas móviles. Montaje 2h antes del evento, técnico presente.',
 '@lucesshowcali', null, 5, 'approved', 4.6,
 '{gobo,cabezas_moviles,follow,tecnico}'),

('Meseros Profesionales Cali',
 'Carmen Mosquera', 'carmen@mescali.co', '3001240041', 'Cali',
 '{meseros}', 250000, 780000, 'per_person', 14000, null,
 'Servicio de meseros uniformados para eventos en Cali. Atención de mesa, coctelería, servicio francés y desamulete. Supervisora incluida para grupos de más de 10 personas.',
 '@mescali', null, 8, 'approved', 4.7,
 '{uniformados,frances,supervisor,cali}'),

('Bar Cali Fiestas',
 'Felipe Mosquera', 'felip@barcali.co', '3001240042', 'Cali',
 '{bartender,bebidas}', 420000, 1300000, 'flat', 0, 130,
 'Bar y bartender para eventos en Cali. Cócteles tropicales con licor y sin alcohol. Decoración de barra incluida. Especialidad en cócteles con ingredientes vallecaucanos.',
 '@barcalifiestas', null, 5, 'approved', 4.7,
 '{tropicales,vallecaucano,sin_alcohol,decoracion}'),

('Florería del Valle',
 'Sofía Ruiz', 'sofia@floreriadelvalle.co', '3001240043', 'Cali',
 '{flores,detalles_mesa}', 160000, 620000, 'flat', 0, null,
 'Arreglos florales naturales para eventos en Cali y el Valle. Flores de temporada: astromelias, girasoles, rosas y orquídeas. Diseño personalizado según tema del evento.',
 '@floreriavalle', null, 9, 'approved', 4.8,
 '{astromelias,orquideas,valle,temporada}'),

('Jump Inflables Cali',
 'Bernardo Sinisterra', 'berna@jumpinflables.co', '3001240044', 'Cali',
 '{inflables}', 180000, 520000, 'flat', 0, 45,
 'Arriendo de inflables para fiestas en Cali: castillos, toboganes y piscinas de pelotas. Instalación y operador incluidos. Desinfección total antes de cada uso.',
 '@jumpinflablescali', null, 4, 'approved', 4.5,
 '{castillos,toboganes,pelotas,desinfeccion}'),

('Dulce Mesa Cali',
 'Andrea Rengifo', 'andrea@dulcemesacali.co', '3001240045', 'Cali',
 '{mesa_dulces,pastel}', 300000, 900000, 'flat', 0, null,
 'Mesa de dulces + torta para eventos en Cali. Cupcakes, macarons, trufas y decoración temática coordinada. Todo bajo el mismo concepto visual del evento.',
 '@dulcemesacali', null, 5, 'approved', 4.7,
 '{cupcakes,trufas,coordinado,concepto}'),

('Personajes Valle Show',
 'Lina Caicedo', 'lina@personajesvalle.co', '3001240046', 'Cali',
 '{personaje_tematico,show_infantil}', 240000, 580000, 'flat', 0, 60,
 'Personajes disfrazados y shows infantiles en Cali. Bluey, Peppa, Spiderman, princesas y dinosaurios. Show de 60 min con baile, juegos y sesión de fotos.',
 '@personajesvalle', null, 4, 'approved', 4.8,
 '{bluey,peppa,spiderman,princesas}'),

('Magia Valle Colombia',
 'Simón Andrade', 'simon@magiavalle.co', '3001240047', 'Cali',
 '{magia,pintucaritas}', 220000, 520000, 'flat', 0, 70,
 'Mago + pintucaritas para eventos en Cali. Show de magia de 45 min y maquillaje artístico para niños. Paquete completo con materiales y ambientación incluida.',
 '@magiavallecol', null, 5, 'approved', 4.6,
 '{mago_pintucaritas,paquete,ninos,60min}'),

('Invita Valle',
 'Carolina Hurtado', 'caro@invitavalle.co', '3001240048', 'Cali',
 '{invitaciones,recordatorios_digitales}', 45000, 200000, 'flat', 0, null,
 'Diseño de invitaciones y recordatorios digitales para eventos en Cali. Animaciones personalizadas, RSVP online y envío masivo por WhatsApp.',
 '@invitavalle', null, 3, 'approved', 4.5,
 '{animadas,rsvp,masivo,whatsapp}'),

('Recuerda Cali',
 'Paula Rengifo', 'paula@recuerdacali.co', '3001240049', 'Cali',
 '{souvenirs,pinata}', 130000, 400000, 'per_child', 6500, null,
 'Souvenirs y piñatas coordinados para fiestas en Cali. Diseño unificado: el mismo tema en el souvenir y la piñata. Mínimo 15 unidades. Envío en Cali.',
 '@recuerdacali', null, 4, 'approved', 4.6,
 '{coordinado,unificado,minimo,envio}'),

-- ══════════════════════════════════════════════════════════════
-- BARRANQUILLA — cobertura completa
-- ══════════════════════════════════════════════════════════════

('Dulce Costa Pasteles',
 'Karla Mercado', 'karla@dulcecosta.co', '3001240050', 'Barranquilla',
 '{pastel}', 80000, 290000, 'flat', 0, null,
 'Tortas y pasteles para fiestas en Barranquilla. Temáticas costeñas y personajes populares. Buttercream tropical, fondant y naked cakes. Entrega en el área metropolitana.',
 '@dulcecostabaq', null, 5, 'approved', 4.7,
 '{tropical,buttercream,fondant,baq}'),

('Ricos Pasabocas BAQ',
 'Yolanda Ramos', 'yoly@ricosbaq.co', '3001240051', 'Barranquilla',
 '{pasabocas_ninos}', 160000, 440000, 'per_child', 8000, null,
 'Pasabocas para niños en Barranquilla: bolsitas costeñas con chicharrines, galletas, jugo de maracuyá y sorpresa. Entrega a domicilio en la ciudad.',
 '@ricosbaq', null, 3, 'approved', 4.5,
 '{costeno,maracuya,domicilio,bolsitas}'),

('Costeño Catering BAQ',
 'Rafael Blanco', 'rafa@costeñocatering.co', '3001240052', 'Barranquilla',
 '{picadas_adultos,catering_completo}', 700000, 1700000, 'per_adult', 16000, 120,
 'Picadas costeñas para adultos en Barranquilla: bollos, arepa de huevo, patacones, chorizos y bebidas típicas. Catering completo disponible con personal de servicio.',
 '@costeñocateringbaq', null, 8, 'approved', 4.8,
 '{bollos,arepa_huevo,costeno,tipico}'),

('Mobil Sillas BAQ',
 'Ingrid Fuentes', 'ingrid@mobilsillasbaq.co', '3001240053', 'Barranquilla',
 '{mobiliario}', 250000, 850000, 'per_person', 8000, 250,
 'Arriendo de sillas y mesas para eventos en Barranquilla. Plegables, Tiffany y plásticas. Entrega, instalación y recogida en toda la ciudad. Disponible fines de semana.',
 '@mobilsillasbaq', null, 6, 'approved', 4.5,
 '{plegables,tiffany,baq,fines_semana}'),

('Recuerdos Costa',
 'Mariela Díaz', 'mariela@recuerdoscosta.co', '3001240054', 'Barranquilla',
 '{souvenirs,pinata}', 110000, 340000, 'per_child', 6000, null,
 'Souvenirs y piñatas temáticas para fiestas en Barranquilla. Diseño costero y vibrante. Bolsitas personalizadas y piñatas de cartón. Mínimo 20 unidades.',
 '@recuerdoscostabaq', null, 4, 'approved', 4.5,
 '{costero,vibrante,carton,minimo}'),

('Lente Costa Fotografía',
 'Daniela Pinto', 'dani@lentecosta.co', '3001240055', 'Barranquilla',
 '{fotografo,videografo}', 260000, 680000, 'flat', 0, null,
 'Fotografía y video para eventos en Barranquilla. Cobertura 4h, galería digital y reel para Instagram. Especialidad en fiestas infantiles y reuniones familiares costeñas.',
 '@lentecostabaq', null, 5, 'approved', 4.7,
 '{infantil,familiar,reel,galeria}'),

('Meseros BAQ Pro',
 'Harold Orozco', 'harold@meserosBAQ.co', '3001240056', 'Barranquilla',
 '{meseros,catering_completo}', 260000, 780000, 'per_person', 14000, null,
 'Meseros y catering para eventos en Barranquilla. Servicio de mesa, bandeja y estilo costeño. Personal uniformado y puntual. Grupos de 20 a 200 personas.',
 '@meserosbaqpro', null, 7, 'approved', 4.6,
 '{costeno,bandeja,puntual,uniformado}'),

('Bar Caribe BAQ',
 'Luis Palencia', 'luis@barcaribbaq.co', '3001240057', 'Barranquilla',
 '{bartender,bebidas}', 380000, 1100000, 'flat', 0, 120,
 'Bar y bartender costeño para eventos en Barranquilla. Cócteles con ron, aguardiente y licores tropicales. Mojitos caribeños, cocteles de mango y maracuyá.',
 '@barcaribbaq', null, 6, 'approved', 4.7,
 '{ron,caribe,mango,maracuya}'),

('ShowBaq Entretenimiento',
 'Sandra Pertuz', 'sandra@showbaq.co', '3001240058', 'Barranquilla',
 '{recreacionista,personaje_tematico,show_infantil}', 260000, 520000, 'flat', 0, 70,
 'Recreacionistas y personajes para fiestas en Barranquilla. Shows con ritmos costeños, personajes infantiles y animación tropical. 90 min de espectáculo.',
 '@showbaq', null, 5, 'approved', 4.7,
 '{costeno,tropical,recreacion,animacion}'),

('PhotoBooth BAQ',
 'Camila Ventura', 'cami@photoboothbaq.co', '3001240059', 'Barranquilla',
 '{photobooth}', 270000, 620000, 'flat', 0, null,
 'Cabina de fotos para eventos en Barranquilla. Ambiente tropical, props caribeños y fondo personalizado. Galería digital con acceso instantáneo por QR.',
 '@photoboothbaq', null, 3, 'approved', 4.5,
 '{tropical,caribeno,props,qr}'),

('Flores BAQ',
 'Rossana Acosta', 'rossana@floresbaq.co', '3001240060', 'Barranquilla',
 '{flores,arco_globos}', 140000, 560000, 'flat', 0, null,
 'Arreglos florales tropicales y arcos de globos para eventos en Barranquilla. Flores exóticas, bromelias, anturios y heliconias. Instalación incluida.',
 '@floresbaq', null, 6, 'approved', 4.6,
 '{tropicales,bromelias,heliconias,exoticas}'),

('Sonido & DJ BAQ',
 'Junior Cantillo', 'junior@sonidodj.co', '3001240061', 'Barranquilla',
 '{sonido,iluminacion}', 280000, 780000, 'flat', 0, 250,
 'Sonido e iluminación profesional para eventos en Barranquilla. Sistema QSC, luces LED y efectos de humo. DJ disponible como servicio adicional.',
 '@sonidodjbaq', null, 7, 'approved', 4.6,
 '{qsc,led,humo,profesional}'),

('Coordina BAQ',
 'María José López', 'majo@coordinabaq.co', '3001240062', 'Barranquilla',
 '{coordinador}', 360000, 1000000, 'flat', 0, null,
 'Coordinación logística de eventos en Barranquilla y la Costa. Gestión total del día del evento, proveedores y timeline. Bilingüe español-inglés.',
 '@coordinabaq', null, 5, 'approved', 4.7,
 '{logistica,timeline,bilingue,costa}'),

('Mesa Dulces BAQ',
 'Ana Verbel', 'ana@mesadulcesbaq.co', '3001240063', 'Barranquilla',
 '{mesa_dulces}', 270000, 800000, 'flat', 0, null,
 'Mesa de dulces tropical para eventos en Barranquilla. Cupcakes de coco, maracuyá y mango. Decoración caribeña incluida. Entrega e instalación en la ciudad.',
 '@mesadulcesbaq', null, 4, 'approved', 4.6,
 '{coco,tropical,caribeño,instalacion}'),

('Piñatas & Recuerdos BAQ',
 'Cecilia Navarro', 'ceci@piñatasbaq.co', '3001240064', 'Barranquilla',
 '{pinata,invitaciones}', 55000, 190000, 'flat', 0, null,
 'Piñatas temáticas e invitaciones para fiestas en Barranquilla. Personajes infantiles y diseños costeños. Dulces incluidos en piñata. Envío en toda la ciudad.',
 '@piñatasbaq', null, 5, 'approved', 4.4,
 '{tematico,costeno,dulces,envio}'),

-- ══════════════════════════════════════════════════════════════
-- CARTAGENA — cobertura completa
-- ══════════════════════════════════════════════════════════════

('Fiestas Cartagena Kids',
 'Gabriela Torres', 'gaby@fiestasctg.co', '3001240065', 'Cartagena',
 '{recreacionista,personaje_tematico}', 270000, 550000, 'flat', 0, 60,
 'Recreacionistas y personajes para fiestas infantiles en Cartagena. Shows con música caribeña y personajes temáticos. Disponible en clubes, fincas y salones del Caribe.',
 '@fiestasctgkids', null, 5, 'approved', 4.7,
 '{caribeña,clubs,fincas,infantil}'),

('Repostería Cartagenera',
 'Pilar Pombo', 'pilar@reposteriacartagena.co', '3001240066', 'Cartagena',
 '{pastel,mesa_dulces}', 90000, 320000, 'flat', 0, null,
 'Tortas y mesas dulces para fiestas en Cartagena. Sabores tropicales: coco con piña, limón costeño y arequipe. Decoración con temática colonial y caribeña.',
 '@reposteriacartagena', null, 6, 'approved', 4.7,
 '{coco,limon_costeno,colonial,caribeño}'),

('Snacks Caribe CTG',
 'Eduardo Causado', 'edu@snackscaribe.co', '3001240067', 'Cartagena',
 '{pasabocas_ninos,picadas_adultos}', 600000, 1600000, 'flat', 0, 100,
 'Pasabocas para niños y picadas para adultos en Cartagena. Menú costero: bollos, arepas, patacones y bebidas naturales. Servicio integral para toda la familia.',
 '@snackscaribectg', null, 4, 'approved', 4.5,
 '{bollos,patacones,costero,integral}'),

('Muebles & Eventos CTG',
 'Patricia de la Espriella', 'pati@mueblescartg.co', '3001240068', 'Cartagena',
 '{mobiliario,menaje}', 260000, 880000, 'per_person', 9000, 200,
 'Arriendo de mobiliario y menaje para eventos en Cartagena. Sillas crossback, mesas coloniales y vajilla de porcelana. Entrega en toda la ciudad y zona norte.',
 '@mueblescartg', null, 7, 'approved', 4.6,
 '{crossback,colonial,porcelana,zona_norte}'),

('Foto Caribe CTG',
 'Andrés Zuñiga', 'andres@fotocaribectg.co', '3001240069', 'Cartagena',
 '{fotografo,videografo}', 280000, 750000, 'flat', 0, null,
 'Fotografía y video para eventos en Cartagena. Cobertura al aire libre, en playas y salones coloniales. Drone disponible para tomas aéreas del Caribe.',
 '@fotocaribectg', 'https://fotocaribectg.co', 8, 'approved', 4.9,
 '{playa,colonial,drone,aereo}'),

('DJ Caribe Fiestas',
 'Germán Salas', 'german@djcaribe.co', '3001240070', 'Cartagena',
 '{dj_musica,sonido}', 300000, 800000, 'flat', 0, 200,
 'DJ y sonido para eventos en Cartagena. Especialidad en música costeña: champeta, vallenato, cumbia y salsa. Equipos resistentes al calor y la humedad caribeña.',
 '@djcaribefiestas', null, 6, 'approved', 4.7,
 '{champeta,vallenato,cumbia,caribeño}'),

('Recuerdos CTG',
 'Cynthia Orozco', 'cynthia@recuerdosctg.co', '3001240071', 'Cartagena',
 '{souvenirs,invitaciones}', 120000, 380000, 'per_child', 6500, null,
 'Souvenirs e invitaciones para fiestas en Cartagena. Diseños caribeños y coloniales. Recuerdos con conchas, estrellas de mar y motivos tropicales personalizados.',
 '@recuerdosctg', null, 4, 'approved', 4.6,
 '{caribeno,colonial,conchas,tropicales}'),

('Bar CTG Caribeño',
 'Jairo Barbosa', 'jairo@barctg.co', '3001240072', 'Cartagena',
 '{bartender,bebidas}', 400000, 1200000, 'flat', 0, 100,
 'Bartender y bebidas para eventos en Cartagena. Cócteles con licores caribeños, cocteles de frutos del Caribe y refrescos tropicales. Barra decorada con el tema del evento.',
 '@barctgcaribeño', null, 7, 'approved', 4.8,
 '{caribeño,licores,frutos,tropicales}'),

('Servicios CTG Eventos',
 'Rocío Vélez', 'rocio@servictg.co', '3001240073', 'Cartagena',
 '{meseros,coordinador}', 320000, 950000, 'flat', 0, null,
 'Meseros y coordinación para eventos en Cartagena. Personal bilingüe, uniformado y con experiencia en eventos internacionales. Servicio para hasta 300 invitados.',
 '@servictg', null, 9, 'approved', 4.8,
 '{bilingue,uniformado,internacional,premium}'),

('Inflables CTG',
 'Carlos Buelvas', 'carlos@inflablesctg.co', '3001240074', 'Cartagena',
 '{inflables}', 190000, 520000, 'flat', 0, 40,
 'Arriendo de inflables para fiestas en Cartagena. Castillos y piscinas de pelotas resistentes al sol caribeño. Instalación y operador incluidos. Disponible fines de semana.',
 '@inflablesctg', null, 3, 'approved', 4.4,
 '{sol,castillos,pelotas,fines_semana}'),

('Flores Caribe CTG',
 'Matilde Soto', 'mati@florescaribectg.co', '3001240075', 'Cartagena',
 '{flores,detalles_mesa}', 170000, 650000, 'flat', 0, null,
 'Florería tropical para eventos en Cartagena. Flores del Caribe, heliconias, anturios y tropicales. Centros de mesa y decoración floral para todo tipo de evento.',
 '@florescaribectg', null, 6, 'approved', 4.7,
 '{heliconia,anturio,tropical,caribeno}'),

-- ══════════════════════════════════════════════════════════════
-- BUCARAMANGA — cobertura completa
-- ══════════════════════════════════════════════════════════════

('Animación BGA Kids',
 'Fabiola Serrano', 'fabiola@animacionbga.co', '3001240076', 'Bucaramanga',
 '{recreacionista,show_infantil}', 260000, 500000, 'flat', 0, 60,
 'Recreacionistas y shows infantiles en Bucaramanga y el área metropolitana. Animación de 2 horas, piñata incluida y sorpresas. Grupos de 10 a 80 niños.',
 '@animacionbga', null, 5, 'approved', 4.6,
 '{santander,metro,pinata,sorpresas}'),

('Tortas & Arte BGA',
 'Ligia Hernández', 'ligia@tortasbga.co', '3001240077', 'Bucaramanga',
 '{pastel}', 70000, 270000, 'flat', 0, null,
 'Tortas artesanales y temáticas para fiestas en Bucaramanga. Sabores: chocolate santandereano, arequipe, frutos rojos y vainilla. Diseños personalizados.',
 '@tortasbga', null, 7, 'approved', 4.7,
 '{santandereano,arequipe,tematico,artesanal}'),

('Snack BGA',
 'Claudia Torres', 'claudia@snackbga.co', '3001240078', 'Bucaramanga',
 '{pasabocas_ninos,picadas_adultos}', 550000, 1500000, 'flat', 0, 80,
 'Pasabocas para niños y picadas para adultos en Bucaramanga. Combo familiar con opciones típicas santandereanas: hormigas culonas, mute y chicharrones artesanales.',
 '@snackbga', null, 4, 'approved', 4.5,
 '{santandereano,hormigas,mute,familiar}'),

('Sillas BGA Eventos',
 'Ernesto Díaz', 'ernesto@sillasbga.co', '3001240079', 'Bucaramanga',
 '{mobiliario}', 240000, 820000, 'per_person', 8000, 220,
 'Arriendo de sillas y mesas para eventos en Bucaramanga y Santander. Tiffany, plegables y mesas redondas. Entrega, armado y recogida en el área metropolitana.',
 '@sillasbga', null, 6, 'approved', 4.5,
 '{santander,tiffany,plegables,area_metro}'),

('Foto BGA Eventos',
 'Álvaro Gómez', 'alvaro@fotobga.co', '3001240080', 'Bucaramanga',
 '{fotografo}', 250000, 650000, 'flat', 0, null,
 'Fotografía profesional para eventos en Bucaramanga. Cobertura 3-5 horas, galería digital en 7 días y 20 fotos impresas. Especialidad en fiestas infantiles y bodas íntimas.',
 '@fotobgaeventos', null, 5, 'approved', 4.6,
 '{impresiones,galeria,bodas,infantil}'),

('Recuerdos BGA',
 'Gloria Medina', 'gloria@recuerdosbga.co', '3001240081', 'Bucaramanga',
 '{souvenirs,pinata}', 115000, 360000, 'per_child', 6000, null,
 'Souvenirs y piñatas para fiestas en Bucaramanga. Diseños temáticos santandereanos. Personalización con nombre y fecha. Entrega en toda el área metropolitana.',
 '@recuerdosbga', null, 4, 'approved', 4.5,
 '{santandereano,personalizado,envio,metro}'),

('DJ BGA Sound',
 'Héctor Llanes', 'hector@djbgasound.co', '3001240082', 'Bucaramanga',
 '{dj_musica,sonido}', 270000, 720000, 'flat', 0, 180,
 'DJ y sonido para eventos en Bucaramanga. Géneros: vallenato, merengue, salsa, pop y tropical. Equipos premium con sub bajo. Disponible para eventos de todo tamaño.',
 '@djbgasound', null, 6, 'approved', 4.7,
 '{vallenato,merengue,sub_bajo,premium}'),

('Meseros BGA Pro',
 'Rosa Rueda', 'rosa@meserosbga.co', '3001240083', 'Bucaramanga',
 '{meseros}', 230000, 720000, 'per_person', 13000, null,
 'Servicio de meseros para eventos en Bucaramanga. Personal uniformado, puntual y con experiencia en eventos familiares y corporativos. Grupos de 20 a 150 personas.',
 '@meserosbgapro', null, 7, 'approved', 4.6,
 '{corporativo,puntual,familiar,santander}'),

('Inflables BGA',
 'Camilo Hernández', 'cami@inflablesbga.co', '3001240084', 'Bucaramanga',
 '{inflables}', 170000, 480000, 'flat', 0, 40,
 'Inflables para fiestas en Bucaramanga. Castillos y toboganes de diferentes tamaños. Instalación 1 hora antes del evento y desmontaje al finalizar.',
 '@inflablesbga', null, 4, 'approved', 4.4,
 '{castillos,toboganes,instalacion,desmontaje}'),

('Coordina BGA',
 'Marcela Ruiz', 'marcela@coordinabga.co', '3001240085', 'Bucaramanga',
 '{coordinador,flores}', 340000, 980000, 'flat', 0, null,
 'Coordinación de eventos y arreglos florales en Bucaramanga. Gestión de proveedores, timeline detallado y decoración floral incluida. Más de 200 eventos realizados.',
 '@coordinabga', null, 6, 'approved', 4.7,
 '{timeline,floral,gestion,200eventos}'),

-- ══════════════════════════════════════════════════════════════
-- PEREIRA — cobertura completa
-- ══════════════════════════════════════════════════════════════

('Animación Pereira Fiesta',
 'Alejandra López', 'ale@animacionpereira.co', '3001240086', 'Pereira',
 '{recreacionista,personaje_tematico}', 250000, 500000, 'flat', 0, 60,
 'Recreacionistas y personajes temáticos para fiestas en Pereira y el Eje Cafetero. 2 horas de entretenimiento infantil. Grupos de 10 a 70 niños.',
 '@animacionpereira', null, 4, 'approved', 4.6,
 '{eje_cafetero,tematico,2horas,infantil}'),

('Pastelería La Ceiba PTO',
 'Consuelo Hoyos', 'consu@pasteleriapto.co', '3001240087', 'Pereira',
 '{pastel}', 65000, 250000, 'flat', 0, null,
 'Tortas artesanales para fiestas en Pereira. Sabores de la región: café, naranja y chocolate cafetero. Decoraciones personalizadas. Entrega en Pereira, Dosquebradas y Santa Rosa.',
 '@pasteleriapto', null, 8, 'approved', 4.7,
 '{cafetero,naranja,chocolate,artesanal}'),

('Snacks PTO',
 'Beatriz Giraldo', 'bea@snackspto.co', '3001240088', 'Pereira',
 '{pasabocas_ninos,picadas_adultos}', 520000, 1400000, 'flat', 0, 80,
 'Pasabocas y picadas para eventos en Pereira. Combo cafetero: pandeyuca, empanadas, frutas de la región y jugos de lulo o maracuyá. Servicio integral familiar.',
 '@snackspto', null, 4, 'approved', 4.5,
 '{pandeyuca,empanadas,lulo,cafetero}'),

('Muebles PTO Eventos',
 'Óscar Cardona', 'oscar@mueblespto.co', '3001240089', 'Pereira',
 '{mobiliario}', 230000, 800000, 'per_person', 7500, 200,
 'Arriendo de sillas y mesas para eventos en Pereira y el Eje Cafetero. Plegables, Tiffany y plásticas. Entrega en toda el área metropolitana de Pereira.',
 '@mueblespto', null, 5, 'approved', 4.5,
 '{plegables,tiffany,eje_cafetero,metro}'),

('Foto & Video PTO',
 'Catalina Bedoya', 'cata@fotovidepto.co', '3001240090', 'Pereira',
 '{fotografo,videografo}', 250000, 680000, 'flat', 0, null,
 'Fotografía y video para eventos en Pereira. Cobertura de 4 horas, galería digital en 7 días y reel para redes. Estilo documental y natural para eventos familiares.',
 '@fotovidepto', null, 5, 'approved', 4.7,
 '{documental,natural,redes,familiar}'),

('Recuerda Pereira',
 'Viviana García', 'viviana@recuerdapereira.co', '3001240091', 'Pereira',
 '{souvenirs}', 100000, 320000, 'per_child', 5500, null,
 'Souvenirs personalizados para fiestas en Pereira. Bolsitas con recuerdos temáticos, detalles con café colombiano y personalización con nombre del evento.',
 '@recuerdapereira', null, 3, 'approved', 4.5,
 '{cafe_colombiano,bolsitas,personalizado}'),

('DJ & Sonido Pereira',
 'Santiago Ocampo', 'santi@djsonidopto.co', '3001240092', 'Pereira',
 '{dj_musica,sonido,iluminacion}', 280000, 750000, 'flat', 0, 200,
 'DJ, sonido e iluminación para eventos en Pereira. Equipos profesionales, variedad musical y luces LED. Disponible para fiestas de todos los tamaños en el Eje Cafetero.',
 '@djsonidopto', null, 6, 'approved', 4.6,
 '{led,variedad,profesional,eje}'),

('Catering PTO',
 'Nelcy Arango', 'nelcy@cateringpto.co', '3001240093', 'Pereira',
 '{meseros,catering_completo,bebidas}', 400000, 1500000, 'per_person', 22000, 100,
 'Meseros y catering completo para eventos en Pereira. Menú paisa adaptado: frijolada, bandeja regional y postres típicos. Personal uniformado y puntual.',
 '@cateringpto', null, 7, 'approved', 4.7,
 '{paisa,frijolada,bandeja,tipico}'),

('Inflables PTO',
 'Germán Tabares', 'german@inflablespto.co', '3001240094', 'Pereira',
 '{inflables}', 160000, 460000, 'flat', 0, 40,
 'Inflables para fiestas en Pereira. Castillos, toboganes y piscinas de pelotas. Instalación y operador incluidos. Disponible los 7 días de la semana.',
 '@inflablespto', null, 3, 'approved', 4.4,
 '{castillos,toboganes,pelotas,7dias}'),

('Coordina Pereira',
 'Paola Montoya', 'paola@coordinapereira.co', '3001240095', 'Pereira',
 '{coordinador,bartender}', 330000, 950000, 'flat', 0, null,
 'Coordinación de eventos y bar en Pereira. Director de evento + bartender con cócteles cafeteros. Especialidad en eventos al aire libre en fincas del Eje Cafetero.',
 '@coordinapereira', null, 5, 'approved', 4.6,
 '{fincas,cafetero,aire_libre,cockteles}'),

-- ══════════════════════════════════════════════════════════════
-- MANIZALES — cobertura completa
-- ══════════════════════════════════════════════════════════════

('Fiestas Manizales',
 'Juliana Ospina', 'juli@fiestasmanizales.co', '3001240096', 'Manizales',
 '{recreacionista,show_infantil}', 240000, 490000, 'flat', 0, 60,
 'Recreacionistas y shows infantiles en Manizales y Caldas. 2 horas de entretenimiento. Piñata y sorpresas incluidas. Disponible en todos los barrios de la ciudad.',
 '@fiestasmanizales', null, 4, 'approved', 4.6,
 '{caldas,2horas,piñata,barrios}'),

('Snacks y Picadas MZL',
 'Adriana Castaño', 'adri@snacksmzl.co', '3001240097', 'Manizales',
 '{pasabocas_ninos,picadas_adultos}', 500000, 1400000, 'flat', 0, 80,
 'Pasabocas para niños y picadas para adultos en Manizales. Menú cafetero: pandeyuca, buñuelos, pandebono y jugos de lulo. Servicio a domicilio en toda la ciudad.',
 '@snacksmzl', null, 3, 'approved', 4.4,
 '{pandeyuca,buñuelos,lulo,domicilio}'),

('Sillas Manizales',
 'Rodrigo Aguirre', 'rodri@sillasmanizales.co', '3001240098', 'Manizales',
 '{mobiliario}', 220000, 780000, 'per_person', 7500, 200,
 'Arriendo de sillas y mesas para eventos en Manizales. Entrega e instalación en toda la ciudad. Plegables, Tiffany y mesas redondas y rectangulares.',
 '@sillasmanizales', null, 5, 'approved', 4.5,
 '{mesas,plegables,instalacion,caldas}'),

('Foto MZL Momentos',
 'Carolina Palomino', 'caro@fotomzl.co', '3001240099', 'Manizales',
 '{fotografo}', 240000, 620000, 'flat', 0, null,
 'Fotografía para eventos en Manizales y Caldas. Cobertura 3-4 horas, galería digital y 15 fotos impresas de cortesía. Especialidad en eventos familiares y quinceañeras.',
 '@fotomzl', null, 5, 'approved', 4.6,
 '{caldas,galeria,quinces,familiar}'),

('Recuerdos MZL',
 'Tatiana Gutiérrez', 'tati@recuerdosmzl.co', '3001240100', 'Manizales',
 '{souvenirs,invitaciones}', 100000, 320000, 'per_child', 5500, null,
 'Souvenirs e invitaciones para fiestas en Manizales. Diseño cafetero: granos de café, colores de la región y personalización con nombre del festejado.',
 '@recuerdosmzl', null, 3, 'approved', 4.4,
 '{cafetero,granos,personalizado,regional}'),

('DJ Manizales Sound',
 'Óscar Ríos', 'oscar@djmzlsound.co', '3001240101', 'Manizales',
 '{dj_musica,sonido}', 260000, 700000, 'flat', 0, 180,
 'DJ y sonido para eventos en Manizales. Variedad musical: pop, vallenato, salsa y electrónica. Equipos con buen volumen para salones y fincas. Disponible fines de semana.',
 '@djmzlsound', null, 5, 'approved', 4.6,
 '{fincas,salones,vallenato,electro}'),

('Meseros MZL Pro',
 'Patricia Gómez', 'paty@meseromzl.co', '3001240102', 'Manizales',
 '{meseros,bebidas}', 220000, 700000, 'per_person', 13000, null,
 'Meseros y servicio de bebidas para eventos en Manizales. Personal uniformado y puntual. Disponible para fiestas de 20 a 120 personas en la ciudad.',
 '@meseromzl', null, 6, 'approved', 4.5,
 '{uniformado,puntual,bebidas,caldas}'),

('Inflables MZL',
 'Camilo Cardona', 'cami@inflablesmzl.co', '3001240103', 'Manizales',
 '{inflables}', 160000, 450000, 'flat', 0, 35,
 'Inflables para fiestas infantiles en Manizales. Castillos y toboganes. Instalación y operador incluidos. Servicio disponible todos los fines de semana.',
 '@inflablesmzl', null, 3, 'approved', 4.3,
 '{castillos,toboganes,fines_semana,operador}'),

('Coordina MZL',
 'Isabel Correa', 'isa@coordinamzl.co', '3001240104', 'Manizales',
 '{coordinador,flores}', 320000, 920000, 'flat', 0, null,
 'Coordinación de eventos y flores para fiestas en Manizales. Gestión total del día + arreglos florales cafeteros con flores de la región. Más de 150 eventos realizados.',
 '@coordinamzl', null, 5, 'approved', 4.6,
 '{flores_regionales,gestion,cafetero,150eventos}'),

-- ══════════════════════════════════════════════════════════════
-- COBERTURA BOGOTÁ/MEDELLÍN — servicios adicionales faltantes
-- ══════════════════════════════════════════════════════════════

-- pintucaritas Medellín (faltaba)
('Color Art Medellín',
 'Valentina Soto', 'valen@colorartmed.co', '3001240105', 'Medellín',
 '{pintucaritas}', 130000, 350000, 'flat', 0, 35,
 'Pintucaritas artística para fiestas infantiles en Medellín. Diseños de animales, personajes y flores. Pigmentos hipoalergénicos y lavables. Hasta 35 niños por evento.',
 '@colorartmed', null, 4, 'approved', 4.7,
 '{hipoalergenico,lavable,ninos,infantil}'),

-- photobooth Barranquilla (extra)
('RecordaFoto BGA',
 'Diana Nieto', 'diana@recordafoto.co', '3001240106', 'Bucaramanga',
 '{photobooth,videografo}', 280000, 650000, 'flat', 0, null,
 'Photobooth y video para eventos en Bucaramanga. Cabina con impresión, galería digital y reel de 60 segundos. Fondo personalizado con el tema del evento.',
 '@recordafotobga', null, 3, 'approved', 4.5,
 '{impresion,reel,personalizado,santander}'),

-- flores para más ciudades
('Flores Santander',
 'Esperanza Díaz', 'esperanza@floressantander.co', '3001240107', 'Bucaramanga',
 '{flores,arco_globos}', 130000, 520000, 'flat', 0, null,
 'Arreglos florales y arcos de globos para eventos en Bucaramanga y Santander. Flores frescas de la sabana y globos cromados. Instalación y desmontaje incluidos.',
 '@floressantander', null, 5, 'approved', 4.6,
 '{sabana,cromados,santander,instalacion}'),

('Flores Manizales',
 'Lucelly Arias', 'lucy@floresmanizales.co', '3001240108', 'Manizales',
 '{flores}', 120000, 480000, 'flat', 0, null,
 'Arreglos florales con flores del Eje Cafetero para eventos en Manizales. Rosas, claveles y flores de exportación. Diseños personalizados para todo tipo de celebración.',
 '@floresmanizales', null, 6, 'approved', 4.6,
 '{rosas,claveles,exportacion,eje}'),

-- magia y show_infantil para más ciudades
('Magia Caribe CTG',
 'Roberto Salas', 'roberto@magiacaribectg.co', '3001240109', 'Cartagena',
 '{magia,show_infantil}', 230000, 530000, 'flat', 0, 70,
 'Mago y shows infantiles en Cartagena. Espectáculo con música caribeña, trucos sorprendentes y participación de los niños. 75 minutos de diversión garantizada.',
 '@magiacaribectg', null, 5, 'approved', 4.7,
 '{caribeño,trucos,participativo,75min}'),

-- videografo para más ciudades
('Video Cafetero PTO',
 'Andrés Tabares', 'andres@videocafetero.co', '3001240110', 'Pereira',
 '{videografo}', 280000, 750000, 'flat', 0, null,
 'Videografía para eventos en Pereira y el Eje Cafetero. Video completo + reel para redes sociales. Cobertura de hasta 5 horas. Entrega en 10 días hábiles.',
 '@videocafetero', null, 4, 'approved', 4.6,
 '{reel,redes,cafetero,5horas}'),

-- bartender para más ciudades
('Bar Santander BGA',
 'Javier Mantilla', 'javier@barsantander.co', '3001240111', 'Bucaramanga',
 '{bartender,bebidas}', 360000, 1050000, 'flat', 0, 100,
 'Bartender y bebidas para eventos en Bucaramanga. Cócteles con aguardiente santandereano, chichas artesanales y bebidas de frutas exóticas de la región.',
 '@barsantanderbga', null, 5, 'approved', 4.6,
 '{aguardiente,chicha,santandereana,exoticas}'),

-- coordinador nacional adicional
('Event Pro Nacional',
 'María Fernanda Castro', 'mafe@eventpronacional.co', '3001240112', 'Bogotá',
 '{coordinador}', 450000, 1400000, 'flat', 0, null,
 'Coordinación premium de eventos con cobertura en todo Colombia. Gestión logística, proveedores y protocolo. Experiencia en eventos corporativos, sociales y bodas. Más de 800 eventos.',
 '@eventpronacional', 'https://eventpronacional.co', 14, 'approved', 5.0,
 '{premium,nacional,corporativo,800eventos}'),

-- seguridad en más ciudades
('Seguridad Cafetera',
 'Luis Eduardo García', 'luis@seguridadcafetera.co', '3001240113', 'Pereira',
 '{seguridad}', 250000, 900000, 'flat', 0, 300,
 'Personal de seguridad para eventos en el Eje Cafetero. Pereira, Armenia y Manizales. Control de acceso, manejo de aforo y coordinación con organismos de seguridad.',
 '@seguridadcafetera', null, 6, 'approved', 4.5,
 '{eje_cafetero,aforo,control,acceso}'),

-- limpieza en más ciudades
('Aseo Rápido Medellín',
 'Sandra Reyes', 'sandra@aseormed.co', '3001240114', 'Medellín',
 '{limpieza}', 170000, 650000, 'flat', 0, null,
 'Servicio de aseo post-evento en Medellín. Limpieza de salones, baños y zonas comunes. Personal puntual y con insumos propios. Disponible domingos y festivos.',
 '@aseormed', null, 4, 'approved', 4.4,
 '{post_evento,baños,domingos,insumos}'),

-- transporte en más ciudades
('Trans Eventos Medellín',
 'Guillermo Caro', 'guille@transeventos.co', '3001240115', 'Medellín',
 '{transporte}', 200000, 750000, 'flat', 0, 50,
 'Transporte de invitados para eventos en Medellín y Antioquia. Vans, Sprinter y microbuses. Conductores certificados y vehículos en perfecto estado. Servicio 24/7.',
 '@transeventosMed', null, 7, 'approved', 4.6,
 '{sprinter,van,antioquia,24_7}'),

-- invitaciones en más ciudades
('Diseño & Fiesta Medellín',
 'Natalia Piedrahita', 'nata@diseñofiesta.co', '3001240116', 'Medellín',
 '{invitaciones,recordatorios_digitales}', 40000, 190000, 'flat', 0, null,
 'Invitaciones y recordatorios digitales para eventos en Medellín. Animaciones personalizadas, RSVP online y distribución masiva por WhatsApp. Entrega en 24 horas.',
 '@diseñofiestamed', null, 3, 'approved', 4.6,
 '{animadas,masivo,rsvp,24horas}'),

-- detalles_mesa más cobertura
('Detalles para Fiestas CTG',
 'Claudia Beltrán', 'claudia@detallescartag.co', '3001240117', 'Cartagena',
 '{detalles_mesa}', 100000, 420000, 'flat', 0, null,
 'Centros y detalles de mesa para eventos en Cartagena. Elementos tropicales y coloniales: conchas, bromelias, velas y portarretratos personalizados. Estilo caribeño elegante.',
 '@detallescartag', null, 4, 'approved', 4.5,
 '{conchas,bromelias,colonial,elegante}'),

-- arco_globos más cobertura
('Globos BGA',
 'Ángela Rodríguez', 'angela@globosbga.co', '3001240118', 'Bucaramanga',
 '{arco_globos,decoracion}', 110000, 360000, 'flat', 0, null,
 'Arcos de globos y decoración para eventos en Bucaramanga. Globos cromados, pastel y neón. Armado en el lugar del evento. Diseños orgánicos y clásicos disponibles.',
 '@globosbga', null, 3, 'approved', 4.4,
 '{cromados,neon,organico,santander}'),

-- mesa_dulces más cobertura
('Dulces de la Ciudad CTG',
 'Rosa Elena Herazo', 'rosa@dulcesctg.co', '3001240119', 'Cartagena',
 '{mesa_dulces}', 260000, 780000, 'flat', 0, null,
 'Mesa de dulces tropical para eventos en Cartagena. Postres con sabores del Caribe: cocadas, dulce de ñame y natilla costeña. Presentación con flores tropicales.',
 '@dulcesctg', null, 4, 'approved', 4.6,
 '{cocadas,ñame,natilla,tropical}'),

-- catering completo más ciudades
('Sabor Cafetero Pereira',
 'Nora Cardona', 'nora@saborcafetero.co', '3001240120', 'Pereira',
 '{catering_completo,picadas_adultos}', 900000, 3000000, 'per_person', 22000, 120,
 'Catering completo y picadas para eventos en Pereira. Menú cafetero: sancocho, frijoles, patacones y postres típicos. Personal de servicio y vajilla incluidos.',
 '@saborcafetero_pto', null, 7, 'approved', 4.7,
 '{sancocho,frijoles,patacones,vajilla}');
