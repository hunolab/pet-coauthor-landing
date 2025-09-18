import React from 'react';

const ProcessoEditorial: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-4 sm:p-6 md:p-8 bg-white font-sans">
      <style jsx>{`
        /* Timeline Styles */
        .timeline {
          width: 100%;
          max-width: 900px;
          margin: 1.5rem auto;
          padding: 0;
          position: relative;
        }

        .outer {
          position: relative;
          padding: 1rem 0;
        }

        .card {
          position: relative;
          width: 100%;
          max-width: 360px;
          margin: 1rem auto;
          padding: 1rem;
          background: #fafafa;
          border-radius: 10px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }

        .info {
          display: flex;
          flex-direction: column;
          background: transparent;
          color: #666;
          padding: 0;
        }

        .title {
          color: #ff4500;
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          position: relative;
          padding-left: 2rem;
        }

        .title::before {
          content: "●";
          position: absolute;
          left: 0;
          top: 0.25rem;
          color: #ff4500;
          font-size: 1.2rem;
          line-height: 1;
        }

        .card p {
          color: #888;
          font-size: 0.95rem;
          line-height: 1.5;
          margin: 0;
        }

        @media (min-width: 768px) {
          .timeline {
            padding: 2rem 0;
          }

          .outer {
            padding: 2rem 0;
          }

          .card {
            width: 45%;
            max-width: 400px;
            margin: 2rem 0;
            padding: 1.5rem;
          }

          .card:nth-child(odd) {
            margin-left: 0;
            margin-right: auto;
            padding-right: 3rem;
          }

          .card:nth-child(even) {
            margin-left: auto;
            margin-right: 0;
            padding-left: 3rem;
          }

          .timeline::before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 50%;
            width: 4px;
            background: linear-gradient(to bottom, #ff4500, #ff6347);
            transform: translateX(-50%);
            border-radius: 2px;
            z-index: 0;
          }

          .card::before {
            content: '';
            position: absolute;
            top: 50%;
            width: 20px;
            height: 20px;
            background: white;
            border: 3px solid #ff4500;
            border-radius: 50%;
            z-index: 1;
            transform: translateY(-50%);
          }

          .card:nth-child(odd)::before {
            right: -12px;
          }

          .card:nth-child(even)::before {
            left: -12px;
          }

          .card:nth-child(odd) .title {
            text-align: left;
            padding-left: 2rem;
          }

          .card:nth-child(even) .title {
            text-align: right;
            padding-right: 2rem;
            padding-left: 0;
          }

          .card:nth-child(odd) .title::before {
            left: 0;
          }

          .card:nth-child(even) .title::before {
            right: 0;
            left: auto;
          }
        }

        @media (max-width: 767px) {
          .timeline {
            padding: 1rem 0;
            margin: 1rem auto;
          }

          .card {
            max-width: 100%;
            margin: 1.5rem auto;
            padding: 1rem;
          }

          .timeline::before {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            left: 1.5rem;
            width: 3px;
            background: linear-gradient(to bottom, #ff4500, #ff6347);
            border-radius: 2px;
            z-index: 0;
          }

          .card::before {
            content: '';
            position: absolute;
            top: 1.2rem;
            left: 0.75rem;
            width: 14px;
            height: 14px;
            background: white;
            border: 2px solid #ff4500;
            border-radius: 50%;
            z-index: 1;
          }

          .title {
            font-size: 1rem;
            padding-left: 2rem;
          }

          .card p {
            font-size: 0.9rem;
          }

          .info {
            margin-left: 2.5rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .card {
            transition: none !important;
          }
        }
      `}</style>

      <div className="timeline">
        <div className="outer">
          <div className="card">
            <div className="info">
              <h3 className="title">Acesso à Área do Escritor</h3>
              <p>Plataforma exclusiva para aprender a escrever um livro.</p>
            </div>
          </div>
          <div className="card">
            <div className="info">
              <h3 className="title">Revisão e Publicação</h3>
              <p>Revisão, diagramação, impressão e registros inclusos.</p>
            </div>
          </div>
          <div className="card">
            <div className="info">
              <h3 className="title">Publicação Física e E-book</h3>
              <p>Seu livro em formato físico e digital.</p>
            </div>
          </div>
          <div className="card">
            <div className="info">
              <h3 className="title">Divulgação</h3>
              <p>Promoção da sua obra em diversos canais.</p>
            </div>
          </div>
          <div className="card">
            <div className="info">
              <h3 className="title">Distribuição</h3>
              <p>Nacional (livrarias, Amazon) e internacional (e-book).</p>
            </div>
          </div>
          <div className="card">
            <div className="info">
              <h3 className="title">Exemplares</h3>
              <p>50 exemplares físicos + 50% de desconto em futuras compras.</p>
            </div>
          </div>
          <div className="card">
            <div className="info">
              <h3 className="title">Programa de Afiliados</h3>
              <p>Link personalizado com 30% de comissão sobre vendas.</p>
            </div>
          </div>
          <div className="card">
            <div className="info">
              <h3 className="title">Certificado e Evento</h3>
              <p>Certificado de coautoria e noite de autógrafos oficial.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessoEditorial;