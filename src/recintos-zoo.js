class Recinto {
    constructor(numero, bioma, tamanhoTotal, animaisExistentes) {
      this.numero = numero;
      this.bioma = bioma;
      this.tamanhoTotal = tamanhoTotal;
      this.animaisExistentes = animaisExistentes;
    }
  
    espacoLivre() {
      let espacoOcupado = this.animaisExistentes.reduce((total, animal) => total + animal.tamanho, 0);
      return this.tamanhoTotal - espacoOcupado;
    }
  }
  
  class Animal {
    constructor(especie, tamanho, biomas) {
      this.especie = especie;
      this.tamanho = tamanho;
      this.biomas = biomas;
    }
  }
  
  class RecintosZoo {
    constructor() {
      this.recintos = [
        new Recinto(1, 'savana', 10, [new Animal('MACACO', 1, ['savana', 'floresta']), new Animal('MACACO', 1, ['savana', 'floresta']), new Animal('MACACO', 1, ['savana', 'floresta'])]),
        new Recinto(2, 'floresta', 5, []),
        new Recinto(3, 'savana e rio', 7, [new Animal('GAZELA', 2, ['savana'])]),
        new Recinto(4, 'rio', 8, []),
        new Recinto(5, 'savana', 9, [new Animal('LEAO', 3, ['savana'])])
      ];
  
      this.animais = {
        'LEAO': new Animal('LEAO', 3, ['savana']),
        'LEOPARDO': new Animal('LEOPARDO', 2, ['savana']),
        'CROCODILO': new Animal('CROCODILO', 3, ['rio']),
        'MACACO': new Animal('MACACO', 1, ['savana', 'floresta']),
        'GAZELA': new Animal('GAZELA', 2, ['savana']),
        'HIPOPOTAMO': new Animal('HIPOPOTAMO', 4, ['savana', 'rio'])
      };
    }
  
    analisaRecintos(tipoAnimal, quantidade) {
      if (!this.animais[tipoAnimal]) {
        return { erro: "Animal inválido" };
      }
  
      if (quantidade <= 0) {
        return { erro: "Quantidade inválida" };
      }
  
      let animal = this.animais[tipoAnimal];
      let recintosViaveis = [];
  
      for (let recinto of this.recintos) {
        let espacoNecessario = animal.tamanho * quantidade;
        if (recinto.animaisExistentes.length > 0) {
          espacoNecessario += 1; // Considerar espaço extra para múltiplas espécies
        }
  
        if (recinto.bioma.includes(animal.biomas) && recinto.espacoLivre() >= espacoNecessario) {
          recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${recinto.espacoLivre() - espacoNecessario} total: ${recinto.tamanhoTotal})`);
        }
      }
  
      if (recintosViaveis.length === 0) {
        return { erro: "Não há recinto viável" };
      }
  
      return { recintosViaveis };
    }
  }
  
  export { RecintosZoo as RecintosZoo };
  