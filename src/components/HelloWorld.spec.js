import Vue from 'vue'
import HelloWorld from './HelloWorld.vue'
import {
    mount
} from '@vue/test-utils'
import moxios from 'moxios'

describe('HelloWorld.spec.js', () => {

    let wrapper
    let functions

    beforeEach(() => {
        wrapper = mount(HelloWorld)
        functions = HelloWorld.methods
        moxios.install()
    })

    afterEach(() => {
        moxios.uninstall()
    })

    it('Testa se soma é uma funcao valida', () => {
        expect(typeof functions.soma).toBe('function')
    })

    it('Testa funcao makotoGostaDeSomar com 2 numeros', () => {
        spyOn(functions, 'soma')

        functions.makotoGostaDeSomar(2, 2)

        expect(functions.soma).toHaveBeenCalledWith(2, 2)
    })

    it('Testa se componente foi renderizado corretamente', () => {
        expect(wrapper.html()).toContain('<h1>MAKOTERA MONSTRO</h1>')
    })

    it('Testa funcao de soma de 2 numeros', () => {
        wrapper.vm.soma(3, 3)
        expect(wrapper.vm.msg).toEqual(6)
    })

    it('Testa clique no botao somar', () => {
        expect(wrapper.html()).toContain('<h1>MAKOTERA MONSTRO</h1>')

        const button = wrapper.find('button')
        button.trigger('click')

        expect(wrapper.html()).toContain('<h1>4</h1>')
    })

    it('Testa requisicao get de produtos com sucesso', (done) => {
        moxios.stubRequest('http://www.mocky.io/v2/5afaf6cd2f00006d00f7c699', {
            status: 200,
            response: [{
                id: 1,
                nome: "Almox"
            }, {
                id: 2,
                nome: "Setup"
            }]
        })

        wrapper.vm.buscaProdutos()

        moxios.wait(() => {
            expect(wrapper.vm.produtos).toEqual([{
                id: 1,
                nome: "Almox"
            }, {
                id: 2,
                nome: "Setup"
            }])
            done()
        })
    })

    it('Testa requisicao get de produtos com erro', () => {
        moxios.stubRequest('http://www.mocky.io/v2/5afaf6cd2f00006d00f7c699', {
            status: 500,
            response: {}
        })

        expect(function () {
            wrapper.vm.buscaProdutos()
        }).toThrowError('Erro ao buscar produtos.')


        // expect(wrapper.vm.buscaProdutos).toThrow('Erro ao buscar produtos.')

        // moxios.wait(() => {
        //     expect(wrapper.vm.buscaProdutos).toThrowError('Erro ao buscar produtos.')
        //     done()
        // })
    })
})