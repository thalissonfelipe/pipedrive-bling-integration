const { create } = require('xmlbuilder2');

const toXML = deals => (
    deals.map(deal => (
        create({ version: '1.0', encoding: 'UTF-8',  })
            .ele('pedido')
                .ele('cliente')
                    .ele('id').txt(deal.orderId).up()
                    .ele('nome').txt(deal.person_name).up()
                    .ele('tipoPessoa').txt('J').up()
                    .ele('endereco').txt('Rua Visconde de Sao Gabriel').up()
                    .ele('cpf_cnpj').txt('00000000000000').up()
                    .ele('ie').txt('3067663000').up()
                    .ele('numero').txt('32').up()
                    .ele('complemento').txt('Sala 54').up()
                    .ele('bairro').txt('Cidade Alta').up()
                    .ele('cep').txt('95.700-000').up()
                    .ele('cidade').txt('Bento Goncalves').up()
                    .ele('uf').txt('RS').up()
                    .ele('fone').txt('5481153376').up()
                    .ele('email').txt('teste@teste.com.br').up()
                .up()
                .ele('transporte')
                    .ele('transportadora').txt('Transportadora XYZ').up()
                    .ele('tipo_frete').txt('R').up()
                    .ele('servico_correios').txt('SEDEX - CONTRATO').up()
                    .ele('dados_etiqueta')
                        .ele('nome').txt('Endereco de entrega').up()
                        .ele('endereco').txt('Rua Visconde de Sao Gabriel').up()
                        .ele('numero').txt('392').up()
                        .ele('complemento').txt('Sala 59').up()
                        .ele('municipio').txt('Bento Goncalves').up()
                        .ele('uf').txt('RS').up()
                        .ele('cep').txt('95.700-000').up()
                        .ele('bairro').txt('Cidade Alta').up()
                    .up()
                    .ele('volumes')
                        .ele('volume')
                            .ele('servico').txt('SEDEX - CONTRATO').up()
                            .ele('codigoRastreamento').txt('').up()
                        .up()
                        .ele('volume')
                            .ele('servico').txt('PAC - CONTRATO').up()
                            .ele('codigoRastreamento').txt('').up()
                        .up()
                    .up()
                .up()
                .ele('items')
                    .ele('item')
                        .ele('codigo').txt('001').up()
                        .ele('descricao').txt('Caneta 001').up()
                        .ele('un').txt('Pc').up()
                        .ele('qtde').txt('10').up()
                        .ele('vlr_unit').txt('1.68').up()
                    .up()
                    .ele('item')
                        .ele('codigo').txt('002').up()
                        .ele('descricao').txt('Caneta 002').up()
                        .ele('un').txt('Cx').up()
                        .ele('qtde').txt('3').up()
                        .ele('vlr_unit').txt('3.75').up()
                    .up()
                    .ele('item')
                        .ele('codigo').txt('003').up()
                        .ele('descricao').txt('Teclado 003').up()
                        .ele('un').txt('Cx').up()
                        .ele('qtde').txt('7').up()
                        .ele('vlr_unit').txt('18.65').up()
                    .up()
                .up()
                .ele('parcelas')
                    .ele('parcela')
                        .ele('data').txt(deal.won_time).up()
                        .ele('vlr').txt(deal.value).up()
                        .ele('obs').txt('Observacao Parcela').up()
                .ele('vlr_frete').txt('15').up()
                .ele('vlr_desconto').txt('10').up()
                .ele('obs').txt('Testando o campo observacoes do pedido').up()
                .ele('obs_internas').txt('Testando o campo observacoes internas do pedido').up()
            .up()
        .end()
    ))
);

const getDifference = (a, b) => {
    const compare = array => (
        current => (
            array.filter(item => item.orderId === current.orderId)
        ).length === 0
    );

    const onlyInA = a.filter(compare(b));
    const onlyInB = b.filter(compare(a));

    return onlyInA.concat(onlyInB);
}

module.exports = { toXML, getDifference };
