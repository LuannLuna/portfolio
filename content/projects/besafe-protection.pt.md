---
slug: "besafe-protection"
title: "BeSafe: Proteção contra apostas"
company: "BeSafe"
period: "2026"
order: 1
featured: true
tagline: "Entreguei o app iOS que bloqueia sites de apostas na camada de DNS — e mantém a proteção ativa quando a VPN cai."
role: "Fui o principal contribuidor iOS: bloqueio por DNS, recuperação de VPN, telemedicina, assinaturas, arquitetura modular e esteira de entrega."
cover: "/content/images/projects/besafe-protection/cover.webp"
coverFit: "contain"
gallery:
  - { src: "/content/images/projects/besafe-protection/01-landing.webp",       caption: "Boas-vindas — proposta de valor e entrada no teste grátis de 7 dias." }
  - { src: "/content/images/projects/besafe-protection/02-home.webp",          caption: "Home — interruptor da proteção, contador de sites bloqueados, dias sem apostar, valor e tempo recuperados." }
  - { src: "/content/images/projects/besafe-protection/03-mood.webp",          caption: "Análises de humor — check-ins emocionais de 30 dias e sequência de 12 dias." }
  - { src: "/content/images/projects/besafe-protection/04-appointments.webp",  caption: "Telemedicina — consultas agendadas e horários disponíveis em psicologia e psiquiatria." }
  - { src: "/content/images/projects/besafe-protection/05-plans.webp",         caption: "Planos — assinatura anual, semestral e trimestral com 60% de desconto no anual." }
  - { src: "/content/images/projects/besafe-protection/06-dns-diagnostics.webp", caption: "Diagnóstico de DNS — caminho ativo do túnel, estado da lista local e contadores de requisições." }
  - { src: "/content/images/projects/besafe-protection/07-request-block.webp", caption: "Solicitar bloqueio — o usuário envia domínios de apostas para análise e acompanha o status." }
  - { src: "/content/images/projects/besafe-protection/08-chat.webp",          caption: "Suporte — atendimento humano 24h e encaminhamento para o cuidado psicológico." }
tags: ["iOS", "Architecture", "Security", "Performance"]
stack:
  - "Swift"
  - "SwiftUI"
  - "Network Extension"
  - "Tuist"
  - "Swift Testing"
  - "Firebase"
  - "RevenueCat"
  - "Fastlane"
challenges:
  - "O iOS não oferece API pública para um app inspecionar o tráfego de outro, então o bloqueio de sites de apostas precisou acontecer na camada de DNS, dentro de uma Network Extension."
  - "O túnel cai quando o celular alterna entre Wi-Fi e rede móvel; sem recuperação, o usuário continua apostando enquanto o app ainda parece protegido."
  - "Assinaturas, telemedicina e fluxos do guardião viviam no mesmo target, então uma mudança em uma área podia quebrar um fluxo crítico de outra."
  - "A revisão da Apple examina interceptação de DNS e rede em segundo plano, e a extensão precisava continuar livre de SDKs de rastreamento."
  - "O app e sua extensão em background compartilhavam o armazenamento de tokens, e uma race condition entre processos causava logouts determinísticos em campo."
  - "Toda tela SwiftUI precisava suportar VoiceOver e Dynamic Type, e as strings precisavam estar prontas para localização mesmo com a primeira release saindo só em português."
decisions:
  - "Encaminhar o DNS por um túnel de pacotes até o resolver DoT do BeSafe, aplicar a lista global baixada e responder aos domínios bloqueados no próprio aparelho antes de eles saírem do celular."
  - "Manter a lista de cada usuário no App Group para um domínio reportado ser bloqueado em segundos, e expor caminho ativo, geração da lista e contadores de erro no diagnóstico."
  - "Migrar a base de UIKit/MVC para SwiftUI com Clean Architecture, tela a tela, em vez de reescrever o app."
  - "Adicionar reconexão e recuperação do túnel na troca de rede, com verificações de saúde que mostram quando a proteção está desligada."
  - "Separar o app em 25 módulos Tuist com fronteiras verificadas pelo compilador; um gate de CI impede SDKs de terceiros na extensão de rede."
  - "Padronizar os testes em Swift Testing e a entrega em fastlane e TestFlight, e enviar a versão 1.1.0 para revisão da Apple."
  - "Entregar toda view SwiftUI com VoiceOver e Dynamic Type e manter as strings prontas para localização, para que adicionar um idioma não exigisse refazer a UI."
  - "Unificar o armazenamento de tokens em uma fonte única compartilhada entre app e extensão, eliminando a race entre processos."
impact:
  - { metric: "200k+ sites", label: "Domínios de apostas bloqueados na camada de DNS" }
  - { metric: "200+ views", label: "Views SwiftUI após a migração de UIKit/MVC" }
  - { metric: "25 módulos", label: "Módulos Tuist com fronteiras verificadas pelo compilador" }
  - { metric: "3.169 testes", label: "Casos em Swift Testing distribuídos em 352 suítes" }
seo:
  title: "BeSafe — bloqueio de apostas por DNS no iOS"
  description: "Bloqueio de DNS em uma Network Extension, migração de 200+ views para SwiftUI e telemedicina em um app de 25 módulos com 3.169 testes."
---

## O trabalho

O BeSafe bloqueia sites de apostas no iPhone. O iOS não permite que um app leia o tráfego de outro, então o bloqueio vive em uma Network Extension: um túnel de pacotes captura as consultas DNS, encaminha para o resolver DoT do BeSafe e responde aos domínios bloqueados no próprio aparelho. O app baixa uma lista global e mantém os domínios reportados por cada usuário no App Group, para que um site novo seja bloqueado em segundos, sem esperar uma nova versão.

Entrei em junho de 2026 e me tornei o principal contribuidor iOS — cerca de 1.400 dos 1.499 commits do repositório, com 128 pull requests abertos e 125 integrados em cinco meses. Separei o app em 25 módulos Tuist com fronteiras verificadas pelo compilador, mantive a extensão livre de SDKs de terceiros com um gate de CI e ampliei a suíte para 3.169 testes em Swift Testing. Também conduzi a esteira de fastlane e TestFlight em 33 builds e enviei a versão 1.1.0 para revisão da Apple. O contrato terminou em novembro de 2026, depois da primeira release e da aprovação da Apple.

A migração substituiu UIKit/MVC por SwiftUI e Clean Architecture tela a tela: NavigationStack, estado com @Observable e async/await, chegando a 200+ views SwiftUI e apenas 5 controllers UIKit. Todas as views SwiftUI saíram com suporte a VoiceOver e Dynamic Type, e as strings estavam prontas para localização mesmo com a primeira release só em português. Na plataforma, respondi por rede, sessão e execução em background — interceptors REST com renovação automática de token, credenciais no Keychain, gatilhos de APNs/BGTask e Firebase/RevenueCat — e corrigi uma race condition entre processos que causava logouts determinísticos, unificando o armazenamento de tokens em uma fonte única.

O trabalho de produto cobriu reconexão do túnel na troca de rede, consultas de telemedicina via Conexa, check-ins de humor, modo guardião, assinaturas com PIX e o chat de suporte. A telemetria no Firebase sem PII transformou bugs de campo impossíveis de reproduzir em dados consultáveis — foi assim que diagnosticamos falhas de recuperação de rede entre Wi-Fi e celular. As telas abaixo vêm do app publicado e da suíte de snapshots.
