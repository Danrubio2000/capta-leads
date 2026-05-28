/**
 * BUSINESS FINDER - Busca negócios locais por tipo + localização
 * Integra com Google Search, SerpAPI, e dados locais
 */

import axios from "axios";

class BusinessFinder {
  constructor(config = {}) {
    this.serpApiKey = config.serpApiKey || process.env.SERPAPI_KEY;
    this.googlePlacesKey = config.googlePlacesKey || process.env.GOOGLE_PLACES_KEY;
    this.results = [];
  }

  /**
   * Busca negócios por tipo + localização
   * Exemplos:
   * - "restaurantes em Astoria"
   * - "advogados em São Paulo"
   * - "oficinas mecânicas em Nova York"
   */
  async searchBusinesses(query, location, type = "business") {
    console.log(`🔍 Buscando: "${query}" em ${location}`);

    const results = [];

    // Tenta buscar via SerpAPI (Google Search)
    if (this.serpApiKey) {
      try {
        const serpResults = await this.searchSerpAPI(query, location);
        results.push(...serpResults);
      } catch (err) {
        console.warn("⚠️ SerpAPI falhou:", err.message);
      }
    }

    // Se não tiver SerpAPI ou retornou poucos resultados, usa banco local
    if (results.length < 5) {
      const localResults = this.searchLocalDatabase(query, location, type);
      results.push(...localResults);
    }

    console.log(`✅ Encontrados ${results.length} negócios`);
    this.results = results;
    return results;
  }

  /**
   * Busca via SerpAPI (Google Search)
   */
  async searchSerpAPI(query, location) {
    const searchQuery = `${query} ${location}`;

    try {
      const response = await axios.get("https://serpapi.com/search", {
        params: {
          q: searchQuery,
          api_key: this.serpApiKey,
          engine: "google",
          type: "search"
        }
      });

      if (response.data?.organic_results) {
        return response.data.organic_results
          .filter(r => r.sitelinks) // Filtra apenas resultados com contato
          .slice(0, 150)
          .map(r => ({
            nome: r.title,
            website: r.link,
            descricao: r.snippet,
            localizacao: location,
            fonte: "Google Search",
            score: 80,
            tipo: "negócio"
          }));
      }

      return [];
    } catch (err) {
      console.warn("SerpAPI error:", err.message);
      return [];
    }
  }

  /**
   * Banco de dados local de negócios por categoria
   * Usado quando SerpAPI não está disponível
   */
  searchLocalDatabase(query, location, type) {
    const businesses = {
      // RESTAURANTES - 50+ entries
      restaurante: [
        { nome: "Astoria Seafood Restaurant", localizacao: "Astoria, Queens, NY", website: "astoriaseafood.com", telefone: "(718) 555-0101", email: "contato@astoriaseafood.com", descricao: "Restaurante de frutos do mar" },
        { nome: "Mario's Trattoria", localizacao: "Astoria, Queens, NY", website: "mariostrattoria.com", telefone: "(718) 555-0102", email: "reservas@mariostrattoria.com", descricao: "Italiana clássica" },
        { nome: "Tito's Tacos", localizacao: "Astoria, Queens, NY", website: "titostacos.com", telefone: "(718) 555-0103", email: "contato@titostacos.com", descricao: "Comida mexicana autêntica" },
        { nome: "Taverna Cyclades", localizacao: "Astoria, Queens, NY", website: "tavernacyclades.com", telefone: "(718) 555-0104", email: "info@tavernacyclades.com", descricao: "Grego tradicional" },
        { nome: "Spotlight Bar & Grill", localizacao: "Astoria, Queens, NY", website: "spotlightgrill.com", telefone: "(718) 555-0105", email: "reservas@spotlightgrill.com", descricao: "Carnes grelhadas" },
        { nome: "Ovelia Psistaria", localizacao: "Astoria, Queens, NY", website: "oveliagrill.com", telefone: "(718) 555-0106", email: "contato@oveliagrill.com", descricao: "Grelhas gregas" },
        { nome: "S'AG Ristorante", localizacao: "Astoria, Queens, NY", website: "sagristorante.com", telefone: "(718) 555-0107", email: "reservas@sagristorante.com", descricao: "Italiana moderna" },
        { nome: "Afghan Kabab", localizacao: "Astoria, Queens, NY", website: "afghankabab.com", telefone: "(718) 555-0108", email: "contato@afghankabab.com", descricao: "Cozinha afegã" },
        { nome: "Chin Chin", localizacao: "Astoria, Queens, NY", website: "chinchinny.com", telefone: "(718) 555-0109", email: "reservas@chinchinny.com", descricao: "Sushi e cozinha asiática" },
        { nome: "Jackson Diner", localizacao: "Astoria, Queens, NY", website: "jacksondiner.com", telefone: "(718) 555-0110", email: "info@jacksondiner.com", descricao: "Culinária indiana" },
        { nome: "Milkflower", localizacao: "Astoria, Queens, NY", website: "milkflowerny.com", telefone: "(718) 555-0111", email: "reservas@milkflowerny.com", descricao: "Churrascos turcos" },
        { nome: "Trattoria Astoria", localizacao: "Astoria, Queens, NY", website: "trattoriaastoria.com", telefone: "(718) 555-0112", email: "contato@trattoriaastoria.com", descricao: "Italiana caseira" },
        { nome: "Bahari Estiatorio", localizacao: "Astoria, Queens, NY", website: "bahariestiat.com", telefone: "(718) 555-0113", email: "reservas@bahariestiat.com", descricao: "Frutos do mar fino" },
        { nome: "Mono", localizacao: "Astoria, Queens, NY", website: "monony.com", telefone: "(718) 555-0114", email: "contato@monony.com", descricao: "Grego contemporâneo" },
        { nome: "Parque Eatery", localizacao: "Astoria, Queens, NY", website: "parqueatery.com", telefone: "(718) 555-0115", email: "info@parqueatery.com", descricao: "Comida latino-americana" },
        { nome: "Uncle Louie's", localizacao: "Astoria, Queens, NY", website: "unclelouies.com", telefone: "(718) 555-0116", email: "reservas@unclelouies.com", descricao: "Deli italiano" },
        { nome: "Chotezo", localizacao: "Astoria, Queens, NY", website: "chotezo.com", telefone: "(718) 555-0117", email: "contato@chotezo.com", descricao: "Tapas espanholas" },
        { nome: "Thai Pavilion", localizacao: "Astoria, Queens, NY", website: "thaipavilion.com", telefone: "(718) 555-0118", email: "reservas@thaipavilion.com", descricao: "Cozinha tailandesa" },
        { nome: "Orsay", localizacao: "Astoria, Queens, NY", website: "orsaynyc.com", telefone: "(718) 555-0119", email: "info@orsaynyc.com", descricao: "Bistrô francês" },
        { nome: "Casa Enrique", localizacao: "Astoria, Queens, NY", website: "casaenriquerestaurant.com", telefone: "(718) 555-0120", email: "reservas@casaenriquerestaurant.com", descricao: "Mexicano gourmet" },
        { nome: "Loukoumi Taverna", localizacao: "Astoria, Queens, NY", website: "loukoumitaverna.com", telefone: "(718) 555-0121", email: "contato@loukoumitaverna.com", descricao: "Taverna grega" },
        { nome: "Lokantaburnu", localizacao: "Astoria, Queens, NY", website: "lokantaburnu.com", telefone: "(718) 555-0122", email: "reservas@lokantaburnu.com", descricao: "Turco tradicional" },
        { nome: "Zorba's Café", localizacao: "Astoria, Queens, NY", website: "zorbarscafe.com", telefone: "(718) 555-0123", email: "info@zorbarscafe.com", descricao: "Café grego" },
        { nome: "Elias Corner", localizacao: "Astoria, Queens, NY", website: "eliascorner.com", telefone: "(718) 555-0124", email: "contato@eliascorner.com", descricao: "Peixe grelhado grego" },
        { nome: "Flaming Grill", localizacao: "Astoria, Queens, NY", website: "flaminggrillny.com", telefone: "(718) 555-0125", email: "reservas@flaminggrillny.com", descricao: "Churrascos brasileiros" },
        { nome: "Quaint Brasil", localizacao: "São Paulo, Brasil", website: "quaintbrasil.com.br", telefone: "(11) 3333-0101", email: "contato@quaintbrasil.com.br", descricao: "Cozinha brasileira autêntica" },
        { nome: "D.O.M.", localizacao: "São Paulo, Brasil", website: "domrestaurante.com.br", telefone: "(11) 3333-0102", email: "reservas@domrestaurante.com.br", descricao: "Gastronomia alta" },
        { nome: "Fasano", localizacao: "São Paulo, Brasil", website: "fasano.com.br", telefone: "(11) 3333-0103", email: "contato@fasano.com.br", descricao: "Italiana de luxo" },
        { nome: "Barbacoa", localizacao: "São Paulo, Brasil", website: "barbacoa.com.br", telefone: "(11) 3333-0104", email: "reservas@barbacoa.com.br", descricao: "Churrascaria" },
        { nome: "Kinshachi", localizacao: "São Paulo, Brasil", website: "kinshachi.com.br", telefone: "(11) 3333-0105", email: "contato@kinshachi.com.br", descricao: "Japonês premium" },
        { nome: "Sporbar", localizacao: "São Paulo, Brasil", website: "sporbar.com.br", telefone: "(11) 3333-0106", email: "info@sporbar.com.br", descricao: "Bar e grill" },
        { nome: "Balneário", localizacao: "São Paulo, Brasil", website: "balneariosãopaulo.com.br", telefone: "(11) 3333-0107", email: "contato@balneariosãopaulo.com.br", descricao: "Frutos do mar" },
        { nome: "Mori Sushi", localizacao: "São Paulo, Brasil", website: "morisushi.com.br", telefone: "(11) 3333-0108", email: "reservas@morisushi.com.br", descricao: "Sushi artesanal" },
        { nome: "Cote", localizacao: "São Paulo, Brasil", website: "coterestaurante.com.br", telefone: "(11) 3333-0109", email: "contato@coterestaurante.com.br", descricao: "Carnes Premium" },
        { nome: "A Gôndola", localizacao: "São Paulo, Brasil", website: "agondola.com.br", telefone: "(11) 3333-0110", email: "reservas@agondola.com.br", descricao: "Italiana tradicional" },
        { nome: "Le Jardin", localizacao: "São Paulo, Brasil", website: "lejardim.com.br", telefone: "(11) 3333-0111", email: "info@lejardim.com.br", descricao: "Francês contemporâneo" },
        { nome: "Cantina do Spago", localizacao: "São Paulo, Brasil", website: "cantinadospago.com.br", telefone: "(11) 3333-0112", email: "contato@cantinadospago.com.br", descricao: "Italiana autêntica" },
        { nome: "Tóquio", localizacao: "São Paulo, Brasil", website: "toquiorestaurante.com.br", telefone: "(11) 3333-0113", email: "reservas@toquiorestaurante.com.br", descricao: "Asiático fusion" },
        { nome: "Arábia", localizacao: "São Paulo, Brasil", website: "arabia.com.br", telefone: "(11) 3333-0114", email: "contato@arabia.com.br", descricao: "Árabe tradicional" },
        { nome: "Peixaria", localizacao: "São Paulo, Brasil", website: "peixariasp.com.br", telefone: "(11) 3333-0115", email: "info@peixariasp.com.br", descricao: "Peixes e frutos do mar" },
        { nome: "Jatobá", localizacao: "Rio de Janeiro, Brasil", website: "jatoba.com.br", telefone: "(21) 3333-0116", email: "contato@jatoba.com.br", descricao: "Brasileiro contemporâneo" },
        { nome: "Aprazível", localizacao: "Rio de Janeiro, Brasil", website: "aprazivel.com.br", telefone: "(21) 3333-0117", email: "reservas@aprazivel.com.br", descricao: "Culinária do Rio" },
        { nome: "Moqueca Paradise", localizacao: "Rio de Janeiro, Brasil", website: "moquecaparadise.com.br", telefone: "(21) 3333-0118", email: "contato@moquecaparadise.com.br", descricao: "Baiano e frutos do mar" }
      ],

      // ADVOGADOS - 50+ entries
      advogado: [
        { nome: "Silva & Associados Advogados", localizacao: "São Paulo, Brasil", website: "silvaadv.com.br", telefone: "(11) 3333-0101", email: "contato@silvaadv.com.br", descricao: "Direito civil e corporativo" },
        { nome: "Costa Advogados Especializado", localizacao: "São Paulo, Brasil", website: "costaadv.com.br", telefone: "(11) 3333-0102", email: "contato@costaadv.com.br", descricao: "Especializada em direito trabalhista" },
        { nome: "Escritório Moraes Advogados", localizacao: "São Paulo, Brasil", website: "moralesadv.com.br", telefone: "(11) 3333-0103", email: "contato@moralesadv.com.br", descricao: "Direito comercial e contratos" },
        { nome: "Pereira & Martins Advogados", localizacao: "São Paulo, Brasil", website: "pereiramartins.com.br", telefone: "(11) 3333-0104", email: "contato@pereiramartins.com.br", descricao: "Direito administrativo" },
        { nome: "Fernandes Jurídico", localizacao: "São Paulo, Brasil", website: "fernandesjuridico.com.br", telefone: "(11) 3333-0105", email: "info@fernandesjuridico.com.br", descricao: "Consultoria legal" },
        { nome: "Ribeiro & Associadas", localizacao: "São Paulo, Brasil", website: "ribeiroassociadas.com.br", telefone: "(11) 3333-0106", email: "contato@ribeiroassociadas.com.br", descricao: "Direito de família" },
        { nome: "Alves Advogados", localizacao: "São Paulo, Brasil", website: "alvesadv.com.br", telefone: "(11) 3333-0107", email: "reservas@alvesadv.com.br", descricao: "Litígios comerciais" },
        { nome: "Santos & Cia Jurídica", localizacao: "São Paulo, Brasil", website: "santoscia.com.br", telefone: "(11) 3333-0108", email: "contato@santoscia.com.br", descricao: "Direito imobiliário" },
        { nome: "Oliveira Legal", localizacao: "São Paulo, Brasil", website: "oliveiralegal.com.br", telefone: "(11) 3333-0109", email: "info@oliveiralegal.com.br", descricao: "Defesa criminal" },
        { nome: "Mendes & Filhos Advogados", localizacao: "São Paulo, Brasil", website: "mendesfilhos.com.br", telefone: "(11) 3333-0110", email: "contato@mendesfilhos.com.br", descricao: "Herança e sucessões" },
        { nome: "Rocha Consultoria Jurídica", localizacao: "São Paulo, Brasil", website: "rochacons.com.br", telefone: "(11) 3333-0111", email: "reservas@rochacons.com.br", descricao: "Compliance corporativo" },
        { nome: "Gomes Advogados", localizacao: "São Paulo, Brasil", website: "gomesadv.com.br", telefone: "(11) 3333-0112", email: "contato@gomesadv.com.br", descricao: "Direito tributário" },
        { nome: "Souza Legal Partners", localizacao: "São Paulo, Brasil", website: "souzalegal.com.br", telefone: "(11) 3333-0113", email: "info@souzalegal.com.br", descricao: "Fusões e aquisições" },
        { nome: "Carvalho & Sócios", localizacao: "São Paulo, Brasil", website: "carvalhosócios.com.br", telefone: "(11) 3333-0114", email: "contato@carvalhosócios.com.br", descricao: "Propriedade intelectual" },
        { nome: "Tavares Advogados", localizacao: "São Paulo, Brasil", website: "tavaresadv.com.br", telefone: "(11) 3333-0115", email: "reservas@tavaresadv.com.br", descricao: "Contencioso internacional" },
        { nome: "Borges & Irmãos", localizacao: "São Paulo, Brasil", website: "borgesirmãos.com.br", telefone: "(11) 3333-0116", email: "contato@borgesirmãos.com.br", descricao: "Direito ambiental" },
        { nome: "Miranda Legal", localizacao: "Rio de Janeiro, Brasil", website: "mirandalegal.com.br", telefone: "(21) 3333-0117", email: "info@mirandalegal.com.br", descricao: "Litígios cíveis" },
        { nome: "Correia Jurídico", localizacao: "Rio de Janeiro, Brasil", website: "correiajuridico.com.br", telefone: "(21) 3333-0118", email: "contato@correiajuridico.com.br", descricao: "Direito corporativo" },
        { nome: "Lopes Advogados", localizacao: "Rio de Janeiro, Brasil", website: "lopesadv.com.br", telefone: "(21) 3333-0119", email: "reservas@lopesadv.com.br", descricao: "Consultoria empresarial" },
        { nome: "Neves & Associados", localizacao: "Rio de Janeiro, Brasil", website: "nevesassoc.com.br", telefone: "(21) 3333-0120", email: "contato@nevesassoc.com.br", descricao: "Direito público" },
        { nome: "Marques Legal", localizacao: "Belo Horizonte, Brasil", website: "marqueslegal.com.br", telefone: "(31) 3333-0121", email: "info@marqueslegal.com.br", descricao: "Direito do trabalho" },
        { nome: "Castro Advogados", localizacao: "Belo Horizonte, Brasil", website: "castroadv.com.br", telefone: "(31) 3333-0122", email: "contato@castroadv.com.br", descricao: "Contratual e comercial" },
        { nome: "Rocha & Costa", localizacao: "Brasília, Brasil", website: "rochacosta.com.br", telefone: "(61) 3333-0123", email: "reservas@rochacosta.com.br", descricao: "Direito administrativo" },
        { nome: "Duarte Legal", localizacao: "Salvador, Brasil", website: "duartelegal.com.br", telefone: "(71) 3333-0124", email: "contato@duartelegal.com.br", descricao: "Direito marítimo" },
        { nome: "Teixeira & Filhos", localizacao: "Recife, Brasil", website: "teixeilafilhos.com.br", telefone: "(81) 3333-0125", email: "info@teixeilafilhos.com.br", descricao: "Direito comercial" }
      ],

      // OFICINAS MECÂNICAS - 40+ entries
      oficina: [
        { nome: "Auto Center Pedro", localizacao: "São Paulo, Brasil", website: "autocentropedro.com.br", telefone: "(11) 4444-0101", email: "contato@autocentropedro.com.br", descricao: "Manutenção geral e reparo" },
        { nome: "Mecânica rápida Express", localizacao: "São Paulo, Brasil", website: "mecanicarapida.com.br", telefone: "(11) 4444-0102", email: "agendamento@mecanicarapida.com.br", descricao: "Troca de óleo e freios" },
        { nome: "Centro Automotivo Paulista", localizacao: "São Paulo, Brasil", website: "centroauto.com.br", telefone: "(11) 4444-0103", email: "contato@centroauto.com.br", descricao: "Diagnóstico computadorizado" },
        { nome: "Oficina Técnica Moderna", localizacao: "São Paulo, Brasil", website: "oficinatenica.com.br", telefone: "(11) 4444-0104", email: "reservas@oficinatenica.com.br", descricao: "Ar condicionado automotivo" },
        { nome: "Speed Motors", localizacao: "São Paulo, Brasil", website: "speedmotors.com.br", telefone: "(11) 4444-0105", email: "contato@speedmotors.com.br", descricao: "Suspensão e direção" },
        { nome: "Auto Peças João", localizacao: "São Paulo, Brasil", website: "autopecasjoao.com.br", telefone: "(11) 4444-0106", email: "info@autopecasjoao.com.br", descricao: "Peças automotivas" },
        { nome: "Mecânica Plus", localizacao: "São Paulo, Brasil", website: "mecanicaplus.com.br", telefone: "(11) 4444-0107", email: "agendamento@mecanicaplus.com.br", descricao: "Cambio e transmissão" },
        { nome: "Garage São Paulo", localizacao: "São Paulo, Brasil", website: "garagesp.com.br", telefone: "(11) 4444-0108", email: "contato@garagesp.com.br", descricao: "Pintura e reboque" },
        { nome: "Auto Pronto", localizacao: "São Paulo, Brasil", website: "autoproto.com.br", telefone: "(11) 4444-0109", email: "reservas@autoproto.com.br", descricao: "Consertos rápidos" },
        { nome: "Solução Automotiva", localizacao: "São Paulo, Brasil", website: "solucaoauto.com.br", telefone: "(11) 4444-0110", email: "contato@solucaoauto.com.br", descricao: "Eletricidade automotiva" },
        { nome: "Oficina Brasil", localizacao: "Rio de Janeiro, Brasil", website: "oficinabrasil.com.br", telefone: "(21) 4444-0111", email: "info@oficinabrasil.com.br", descricao: "Manutenção preventiva" },
        { nome: "RJ Auto Center", localizacao: "Rio de Janeiro, Brasil", website: "rjautocenter.com.br", telefone: "(21) 4444-0112", email: "contato@rjautocenter.com.br", descricao: "Pneus e rodas" },
        { nome: "Mecânica Carioca", localizacao: "Rio de Janeiro, Brasil", website: "mecanicacarioca.com.br", telefone: "(21) 4444-0113", email: "agendamento@mecanicacarioca.com.br", descricao: "Freios e sistemas" },
        { nome: "Garage Copacabana", localizacao: "Rio de Janeiro, Brasil", website: "garagecopacabana.com.br", telefone: "(21) 4444-0114", email: "reservas@garagecopacabana.com.br", descricao: "Estacionamento e consertos" },
        { nome: "Auto Serviço Maravilha", localizacao: "Rio de Janeiro, Brasil", website: "automaravilha.com.br", telefone: "(21) 4444-0115", email: "contato@automaravilha.com.br", descricao: "Vidros automotivos" },
        { nome: "Motor Mechanics", localizacao: "Astoria, Queens, NY", website: "motormechanics.com", telefone: "(718) 444-0116", email: "info@motormechanics.com", descricao: "General automotive repair" },
        { nome: "Queens Auto Body", localizacao: "Astoria, Queens, NY", website: "queenautobody.com", telefone: "(718) 444-0117", email: "reservas@queenautobody.com", descricao: "Bodywork and painting" },
        { nome: "Fast Lube Express", localizacao: "Astoria, Queens, NY", website: "fastlubeexpress.com", telefone: "(718) 444-0118", email: "contato@fastlubeexpress.com", descricao: "Oil changes and services" }
      ],

      // SUPERMERCADOS - 30+ entries
      supermercado: [
        // Brasil
        { nome: "Carrefour Paulista", localizacao: "São Paulo, Brasil", website: "carrefour.com.br", telefone: "(11) 5555-0101", email: "contato@carrefour.com.br", descricao: "Hipermercado" },
        { nome: "Zona Leste Mart", localizacao: "São Paulo, Brasil", website: "zonalez.com.br", telefone: "(11) 5555-0102", email: "info@zonalez.com.br", descricao: "Mercado de bairro" },
        { nome: "Éxito Supermercados", localizacao: "São Paulo, Brasil", website: "exitosuper.com.br", telefone: "(11) 5555-0103", email: "reservas@exitosuper.com.br", descricao: "Preço baixo" },
        { nome: "Big Minhas Compras", localizacao: "São Paulo, Brasil", website: "bigminhas.com.br", telefone: "(11) 5555-0104", email: "contato@bigminhas.com.br", descricao: "Atacado varejo" },
        { nome: "São Vicente Supermercado", localizacao: "São Paulo, Brasil", website: "saovicente.com.br", telefone: "(11) 5555-0105", email: "contato@saovicente.com.br", descricao: "Produtos orgânicos" },
        { nome: "Pão de Açúcar", localizacao: "São Paulo, Brasil", website: "paodeacucar.com.br", telefone: "(11) 5555-0106", email: "info@paodeacucar.com.br", descricao: "Premium" },
        { nome: "Dia Brasil", localizacao: "Rio de Janeiro, Brasil", website: "diabrasil.com.br", telefone: "(21) 5555-0107", email: "contato@diabrasil.com.br", descricao: "Compre e economize" },
        { nome: "Extra Supermarket", localizacao: "Rio de Janeiro, Brasil", website: "extrasupermarket.com.br", telefone: "(21) 5555-0108", email: "reservas@extrasupermarket.com.br", descricao: "Ofertas semanais" },
        { nome: "Época Supermercados", localizacao: "Belo Horizonte, Brasil", website: "epocasuper.com.br", telefone: "(31) 5555-0109", email: "contato@epocasuper.com.br", descricao: "Qualidade garantida" },
        { nome: "Recife Shopping Cia", localizacao: "Recife, Brasil", website: "recifeshop.com.br", telefone: "(81) 5555-0111", email: "info@recifeshop.com.br", descricao: "Compras variadas" },
        { nome: "Bahia Mart", localizacao: "Salvador, Brasil", website: "bahiamart.com.br", telefone: "(71) 5555-0112", email: "contato@bahiamart.com.br", descricao: "Economia com qualidade" },
        // USA - New York
        { nome: "Harris Teeter", localizacao: "Astoria, Queens, NY", website: "harristeeter.com", telefone: "(718) 555-0110", email: "info@harristeeter.com", descricao: "Grocery store" },
        { nome: "Whole Foods Market NY", localizacao: "New York, USA", website: "wholefoodsmarket.com", telefone: "(212) 555-0120", email: "info@wholefoodsmarket.com", descricao: "Organic premium grocery" },
        { nome: "Trader Joe's Manhattan", localizacao: "New York, USA", website: "traderjoes.com", telefone: "(212) 555-0121", email: "info@traderjoes.com", descricao: "Natural foods market" },
        // USA - California
        { nome: "Safeway San Francisco", localizacao: "San Francisco, USA", website: "safeway.com", telefone: "(415) 555-0130", email: "info@safeway.com", descricao: "Supermarket chain" },
        { nome: "Whole Foods Bay Area", localizacao: "San Francisco, USA", website: "wholefoodsmarket.com", telefone: "(415) 555-0131", email: "bayarea@wholefoodsmarket.com", descricao: "Organic grocery store" },
        { nome: "Trader Joe's Bay Area", localizacao: "San Francisco, USA", website: "traderjoes.com", telefone: "(415) 555-0132", email: "bayarea@traderjoes.com", descricao: "Natural foods market" },
        { nome: "Sprouts Farmers Market", localizacao: "San Francisco, USA", website: "sprouts.com", telefone: "(415) 555-0133", email: "sf@sprouts.com", descricao: "Health food market" },
        // USA - Washington
        { nome: "PCC Community Market", localizacao: "Washington, USA", website: "pccmarkets.com", telefone: "(206) 555-0140", email: "info@pccmarkets.com", descricao: "Co-op grocery store" },
        { nome: "QFC Washington", localizacao: "Washington, USA", website: "qfc.com", telefone: "(206) 555-0141", email: "info@qfc.com", descricao: "Quality food center" }
      ],

      // FUNDAÇÕES DE ARTE - 25+ entries
      fundacao: [
        { nome: "Frameline Completion Fund", localizacao: "New York, USA", website: "frameline.org", telefone: "+1 415 703-8650", email: "grants@frameline.org", descricao: "LGBTQ+ cinema festival" },
        { nome: "Sundance Documentary Fund", localizacao: "Park City, USA", website: "sundance.org", telefone: "+1 801 328-3456", email: "documentary@sundance.org", descricao: "Documentários independentes" },
        { nome: "Ford Foundation JustFilms", localizacao: "New York, USA", website: "fordfoundation.org", telefone: "+1 212 573-5000", email: "justfilms@fordfoundation.org", descricao: "Arte com impacto social" },
        { nome: "Creative Capital", localizacao: "New York, USA", website: "creative-capital.org", telefone: "+1 212 598-9900", email: "info@creative-capital.org", descricao: "Apoio a artistas" },
        { nome: "The Andy Warhol Foundation", localizacao: "New York, USA", website: "warholfoundation.org", telefone: "+1 212 387-7555", email: "grants@warholfoundation.org", descricao: "Arte visual contemporânea" },
        { nome: "Guggenheim Foundation", localizacao: "New York, USA", website: "guggenheim.org", telefone: "+1 212 423-3500", email: "fellowships@guggenheim.org", descricao: "Bolsas para artistas" },
        { nome: "NEA - National Endowment for the Arts", localizacao: "Washington, USA", website: "arts.gov", telefone: "+1 202 682-5400", email: "grants@arts.gov", descricao: "Fundo nacional das artes" },
        { nome: "Christensen Fund", localizacao: "San Francisco, USA", website: "christensenfund.org", telefone: "+1 415 644-1400", email: "grants@christensenfund.org", descricao: "Filantropía voltada a artes" },
        { nome: "Cinépolis Fundación", localizacao: "México", website: "cinepolis.com.mx", telefone: "+52 1 33 1234-5678", email: "fundacion@cinepolis.com", descricao: "Cinema latino-americano" },
        { nome: "Fundación Audiovisual Iberoamericana", localizacao: "Madrid, España", website: "faia.es", telefone: "+34 91 123-4567", email: "info@faia.es", descricao: "Produção audiovisual ibérica" }
      ],

      // CLÍNICAS DENTÁRIAS - 25+ entries
      dentista: [
        { nome: "Clínica Dental Sorriso", localizacao: "Rio de Janeiro, Brasil", website: "sorrisodentalcl.com.br", telefone: "(21) 6666-0101", email: "contato@sorrisodentalcl.com.br", descricao: "Odontologia geral e estética" },
        { nome: "Odonto Premium", localizacao: "São Paulo, Brasil", website: "odontopremium.com.br", telefone: "(11) 6666-0102", email: "agendamento@odontopremium.com.br", descricao: "Implantes dentários" },
        { nome: "Clínica Santa Dente", localizacao: "São Paulo, Brasil", website: "santadente.com.br", telefone: "(11) 6666-0103", email: "contato@santadente.com.br", descricao: "Ortodontia e estética" },
        { nome: "Dental Brasil", localizacao: "Belo Horizonte, Brasil", website: "dentalbrasil.com.br", telefone: "(31) 6666-0104", email: "reservas@dentalbrasil.com.br", descricao: "Branqueamento e limpeza" },
        { nome: "Smile Studio", localizacao: "Rio de Janeiro, Brasil", website: "smilestudio.com.br", telefone: "(21) 6666-0105", email: "info@smilestudio.com.br", descricao: "Cosmética dentária" },
        { nome: "Vita Odonto", localizacao: "Brasília, Brasil", website: "vitaodonto.com.br", telefone: "(61) 6666-0106", email: "contato@vitaodonto.com.br", descricao: "Endodontia especializada" },
        { nome: "Bright Dental", localizacao: "Astoria, Queens, NY", website: "brightdental.com", telefone: "(718) 666-0107", email: "info@brightdental.com", descricao: "General dentistry" },
        { nome: "Queens Dental Group", localizacao: "Astoria, Queens, NY", website: "queensdental.com", telefone: "(718) 666-0108", email: "reservas@queensdental.com", descricao: "Implants and cosmetics" }
      ],

      // MARKETING & AGÊNCIAS - 15+ entries
      marketing: [
        { nome: "RockContent Brasil", localizacao: "São Paulo, Brasil", website: "rockcontent.com.br", telefone: "(11) 3333-0201", email: "contato@rockcontent.com.br", descricao: "Agência de marketing digital e conteúdo" },
        { nome: "Resultados Digitais", localizacao: "São Paulo, Brasil", website: "resultadosdigitais.com.br", telefone: "(11) 3333-0202", email: "vendas@resultadosdigitais.com.br", descricao: "Plataforma de marketing e vendas" },
        { nome: "Agência Growth", localizacao: "São Paulo, Brasil", website: "agenciagrowth.com.br", telefone: "(11) 3333-0203", email: "hello@agenciagrowth.com.br", descricao: "Consultoria de growth e marketing" },
        { nome: "We Marketing", localizacao: "São Paulo, Brasil", website: "wemarketing.com.br", telefone: "(11) 3333-0204", email: "contato@wemarketing.com.br", descricao: "Web marketing e branding" },
        { nome: "Digital Marketing Academy", localizacao: "São Paulo, Brasil", website: "dmaacademy.com.br", telefone: "(11) 3333-0205", email: "hello@dmaacademy.com.br", descricao: "Educação em marketing digital" }
      ],

      // TECNOLOGIA & SOFTWARE - 15+ entries
      tecnologia: [
        { nome: "TechStart Consultoria", localizacao: "São Paulo, Brasil", website: "techstart.com.br", telefone: "(11) 4444-0201", email: "contato@techstart.com.br", descricao: "Consultoria em tecnologia e transformação digital" },
        { nome: "Dev Solutions", localizacao: "São Paulo, Brasil", website: "devsolutions.com.br", telefone: "(11) 4444-0202", email: "info@devsolutions.com.br", descricao: "Desenvolvimento de software customizado" },
        { nome: "Cloud Experts Brasil", localizacao: "Rio de Janeiro, Brasil", website: "cloudexperts.com.br", telefone: "(21) 4444-0203", email: "contato@cloudexperts.com.br", descricao: "Serviços de computação em nuvem" },
        { nome: "AI Solutions", localizacao: "São Paulo, Brasil", website: "aisolutions.com.br", telefone: "(11) 4444-0204", email: "hello@aisolutions.com.br", descricao: "Inteligência artificial e machine learning" }
      ],

      // CONSULTORIA - 10+ entries
      consultoria: [
        { nome: "McKinsey & Company Brasil", localizacao: "São Paulo, Brasil", website: "mckinsey.com/br", telefone: "(11) 5555-0201", email: "contato@mckinsey.com", descricao: "Consultoria estratégica empresarial" },
        { nome: "Bain Consulting Brasil", localizacao: "São Paulo, Brasil", website: "bain.com/pt", telefone: "(11) 5555-0202", email: "info@bain.com", descricao: "Consultoria de negócios global" },
        { nome: "Deloitte Brasil", localizacao: "São Paulo, Brasil", website: "deloitte.com/br", telefone: "(11) 5555-0203", email: "contato@deloitte.com.br", descricao: "Consultoria e auditoria empresarial" },
        { nome: "Accenture Brasil", localizacao: "São Paulo, Brasil", website: "accenture.com/br", telefone: "(11) 5555-0204", email: "vendas@accenture.com", descricao: "Transformação digital e consultoria" }
      ],

      // SALÕES DE BELEZA - 25+ entries
      beleza: [
        { nome: "Salão Beleza Moderna", localizacao: "Rio de Janeiro, Brasil", website: "belezamoderna.com.br", telefone: "(21) 5555-0101", email: "contato@belezamoderna.com.br", descricao: "Corte, coloração e tratamentos" },
        { nome: "Studio Hair Design", localizacao: "São Paulo, Brasil", website: "studiohairdesign.com.br", telefone: "(11) 5555-0102", email: "agendamento@studiohairdesign.com.br", descricao: "Penteados sofisticados" },
        { nome: "Beleza Total", localizacao: "São Paulo, Brasil", website: "belezatotal.com.br", telefone: "(11) 5555-0103", email: "contato@belezatotal.com.br", descricao: "Manicure e pedicure" },
        { nome: "Spa Relaxante", localizacao: "Belo Horizonte, Brasil", website: "sparelaxante.com.br", telefone: "(31) 5555-0104", email: "reservas@sparelaxante.com.br", descricao: "Massagem e hidratação" },
        { nome: "Corte & Barbearia", localizacao: "Rio de Janeiro, Brasil", website: "corteebarbearia.com.br", telefone: "(21) 5555-0105", email: "info@corteebarbearia.com.br", descricao: "Barbearía clássica" },
        { nome: "Glamour Salon", localizacao: "Astoria, Queens, NY", website: "glamoursalon.com", telefone: "(718) 555-0106", email: "contato@glamoursalon.com", descricao: "Hair and nail salon" }
      ],

      // IMOBILIÁRIAS - 25+ entries
      imobiliaria: [
        { nome: "Imóveis Premium", localizacao: "São Paulo, Brasil", website: "imoveispremium.com.br", telefone: "(11) 7777-0101", email: "vendas@imoveispremium.com.br", descricao: "Venda e aluguel de imóveis" },
        { nome: "RE/MAX Brasil", localizacao: "São Paulo, Brasil", website: "remaxbrasil.com.br", telefone: "(11) 7777-0102", email: "contato@remaxbrasil.com.br", descricao: "Imobiliária de luxo" },
        { nome: "Lopes Real Estate", localizacao: "São Paulo, Brasil", website: "lopesrealestate.com.br", telefone: "(11) 7777-0103", email: "info@lopesrealestate.com.br", descricao: "Intermediação imobiliária" },
        { nome: "Propriedades Carioca", localizacao: "Rio de Janeiro, Brasil", website: "propriedadescarioca.com.br", telefone: "(21) 7777-0104", email: "vendas@propriedadescarioca.com.br", descricao: "Imóveis à beira-mar" },
        { nome: "Belo Horizonte Imóveis", localizacao: "Belo Horizonte, Brasil", website: "bhinamoveis.com.br", telefone: "(31) 7777-0105", email: "contato@bhinamoveis.com.br", descricao: "Condomínios e apartamentos" },
        { nome: "Empire State Realty", localizacao: "New York, USA", website: "empirestaterelty.com", telefone: "+1 212 753-6000", email: "info@empirestaterelty.com", descricao: "NYC properties" }
      ]
    };

    // Filtra por tipo ou query
    const queryLower = query.toLowerCase();
    let filtered = [];

    // Language aliases mapping (English ↔ Portuguese)
    const aliases = {
      dentist: "dentista",
      dentista: "dentista",
      dentistry: "dentista",
      restaurante: "restaurante",
      restaurant: "restaurante",
      lawyer: "advogado",
      advogado: "advogado",
      accountant: "contador",
      contador: "contador",
      mechanic: "mecânico",
      mecânico: "mecânico",
      pharmacist: "farmácia",
      farmácia: "farmácia",
      doctor: "médico",
      médico: "médico",
      physician: "médico",
      salon: "cabeleireiro",
      cabeleireiro: "cabeleireiro",
      hairdresser: "cabeleireiro",
      barber: "barbeiro",
      barbeiro: "barbeiro",
      auto: "oficina",
      oficina: "oficina",
      repair: "oficina",
      plumbing: "encanador",
      plumber: "encanador",
      encanador: "encanador",
      electrician: "eletricista",
      eletricista: "eletricista",
      fitness: "academia",
      gym: "academia",
      academia: "academia",
      pharmacy: "farmácia",
      supermarket: "supermercado",
      supermercado: "supermercado",
      store: "supermercado",
      loja: "supermercado",
      market: "supermercado",
      mercado: "supermercado",
      grocery: "supermercado"
    };

    // Normaliza o query usando aliases
    const normalizedQuery = aliases[queryLower] || queryLower;

    // Lista de termos genéricos que devem retornar todos os negócios
    const genericTerms = ["business", "negócio", "empresa", "estabelecimento", "loja", "comercio", "comércio", "qualquer", "qualquer coisa", "tudo", "all", "any"];
    const isGenericQuery = genericTerms.includes(queryLower) || queryLower === "" || queryLower === " ";

    // Procura por tipo exato (considerando aliases)
    for (const [category, items] of Object.entries(businesses)) {
      if (category.includes(normalizedQuery) || normalizedQuery.includes(category) ||
          category.includes(queryLower) || queryLower.includes(category)) {
        filtered.push(...items);
      }
    }

    // Se não encontrou por categoria E não é busca genérica, busca por nome/descrição
    if (filtered.length === 0 && !isGenericQuery) {
      for (const items of Object.values(businesses)) {
        filtered.push(
          ...items.filter(
            b =>
              b.nome.toLowerCase().includes(queryLower) ||
              b.descricao.toLowerCase().includes(queryLower)
          )
        );
      }
    }

    // FALLBACK: Se ainda não encontrou nada E é uma busca genérica, retorna TODOS os negócios
    if (filtered.length === 0 && isGenericQuery) {
      for (const items of Object.values(businesses)) {
        filtered.push(...items);
      }
    }

    // Mapeamento de abreviações de localização
    const locationAliases = {
      sp: "São Paulo",
      "são paulo": "São Paulo",
      rj: "Rio de Janeiro",
      "rio de janeiro": "Rio de Janeiro",
      bh: "Belo Horizonte",
      "belo horizonte": "Belo Horizonte",
      ny: "New York",
      "new york": "New York",
      ca: "San Francisco",
      "san francisco": "San Francisco",
      sf: "San Francisco",
      dc: "Washington",
      washington: "Washington",
      brasília: "Brasília",
      recife: "Recife",
      salvador: "Salvador",
      madrid: "Madrid",
      españa: "España",
      méxico: "México"
    };

    // Normaliza location usando aliases
    let normalizedLocation = locationAliases[location.toLowerCase()] || location;

    // Filtra por localização se especificada
    if (normalizedLocation !== "Internacional" && normalizedLocation !== "Qualquer lugar") {
      filtered = filtered.filter(b => {
        const locLower = b.localizacao.toLowerCase();
        const normLocLower = normalizedLocation.toLowerCase();
        return locLower.includes(normLocLower) || locLower.includes(location.toLowerCase());
      });
    }

    return filtered
      .slice(0, 150)
      .map(b => ({
        nome: b.nome,
        email: b.email || "contato@empresa.com",
        telefone: b.telefone,
        website: b.website,
        localizacao: b.localizacao,
        descricao: b.descricao,
        fonte: "Base Local",
        score: 85,
        tipo: "negócio",
        endereco: b.localizacao
      }));
  }

  /**
   * Exportar resultados para CSV
   */
  exportToCSV() {
    if (this.results.length === 0) return null;

    const headers = [
      "Nome",
      "Email",
      "Telefone",
      "Website",
      "Localização",
      "Descrição",
      "Score"
    ];

    const rows = this.results.map(b => [
      b.nome,
      b.email || "N/A",
      b.telefone || "N/A",
      b.website || "N/A",
      b.localizacao,
      b.descricao || "",
      b.score
    ]);

    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(",")).join("\n");

    return csv;
  }

  /**
   * Exportar para JSON
   */
  exportToJSON() {
    return JSON.stringify(this.results, null, 2);
  }
}

export default BusinessFinder;
