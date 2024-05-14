const CarroService = require('../services/CarroService');

module.exports = {
    buscarTodos: async (req, res) => {
        let json = { error: '', result: [] };

        let carros = await CarroService.buscarTodos();

        for (let i in carros) {
            json.result.push({
                codigo: carros[i].codigo,
                descricao: carros[i].modelo,
            });
        }
        res.json(json);
    },

    buscaUm: async (req, res) => {
        let json = { error: '', result: {} };

        let codigo = req.params.codigo;
        let carro = await CarroService.buscaUm(codigo);

        if (carro) {
            json.result = carro;
        }

        res.json(json);
    },

    inserir: async (req, res) => {
        let json = { error: '', result: {} };

        let modelo = req.body.modelo;
        let placa = req.body.placa;

        if (modelo && placa) {
            let CarroCodigo = await CarroService.inserir(modelo, placa);
            json.result = {
                codigo: CarroCodigo,
                modelo,
                placa
            }
        } else {
            json.error = 'Campos não enviados';
        }

        res.json(json);
    },

    alterar: async (req, res) => {
        let json = { error: '', result: {} };

        let codigo = req.params.codigo;
        let modelo = req.body.modelo;
        let placa = req.body.placa;

        if (codigo && modelo && placa) {
            await CarroService.alterar(codigo, modelo, placa);
            json.result = {
                codigo,
                modelo,
                placa
            };
        } else {
            json.error = 'Campos não enviados';
        }

        res.json(json);
    },
    
    excluir: async (req, res) => {
        let json = { error: '', result: {} };

        let codigo = req.params.codigo;

        if (codigo) {
            await CarroService.excluir(codigo);
        } else {
            json.error = 'Código não enviado';
        }

        res.json(json);
    }
};