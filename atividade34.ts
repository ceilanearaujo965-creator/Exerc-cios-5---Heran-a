// ============================================================
// Lista de Exercícios - POO em TypeScript

const titulo = (t: string) => console.log(`\n===== ${t} =====`);

// ------------------------------------------------------------
// PARTE 1 - Herança e Sobrescrita (Override)
// ------------------------------------------------------------

function questao1() {
  titulo("Questão 1 - Funcionario e Gerente");

  class Funcionario {
    constructor(protected nome: string, protected salarioBase: number) {}

    calcularSalario(): number {
      return this.salarioBase;
    }
  }

  class Gerente extends Funcionario {
    constructor(nome: string, salarioBase: number, private bonus: number) {
      super(nome, salarioBase);
    }

    // Override: reaproveita o cálculo da base e soma o bônus
    calcularSalario(): number {
      return super.calcularSalario() + this.bonus;
    }

    descrever(): string {
      return `${this.nome} recebe R$ ${this.calcularSalario().toFixed(2)}`;
    }
  }

  const f = new Funcionario("Ana", 3000);
  const g = new Gerente("Carlos", 5000, 2500);
  console.log("Funcionário:", f.calcularSalario()); // 3000
  console.log("Gerente:", g.calcularSalario()); // 7500
  console.log(g.descrever());
}

function questao2() {
  titulo("Questão 2 - Veiculo e CarroEsportivo");

  class Veiculo {
    velocidade = 0;

    acelerar(incremento: number): void {
      this.velocidade += incremento;
    }
  }

  class CarroEsportivo extends Veiculo {
    // Incrementa o dobro da taxa informada
    acelerar(incremento: number): void {
      super.acelerar(incremento * 2);
    }
  }

  const v = new Veiculo();
  const c = new CarroEsportivo();
  v.acelerar(10);
  c.acelerar(10);
  console.log("Veículo comum:", v.velocidade); // 10
  console.log("Carro esportivo:", c.velocidade); // 20
}


function questao3() {
  titulo("Questão 3 - Animal, Cachorro e Gato");

  abstract class Animal {
    constructor(protected nome: string) {}
    abstract falar(): string;
  }

  class Cachorro extends Animal {
    falar(): string {
      return `${this.nome} diz: Au au!`;
    }
  }

  class Gato extends Animal {
    falar(): string {
      return `${this.nome} diz: Miau!`;
    }
  }

  const animais: Animal[] = [new Cachorro("Rex"), new Gato("Mimi")];
  animais.forEach((a) => console.log(a.falar()));
}

function questao4() {
  titulo("Questão 4 - ContaBancaria e ContaCorrente");

  class ContaBancaria {
    constructor(protected saldo: number) {}

    sacar(valor: number): boolean {
      if (valor <= 0 || valor > this.saldo) return false;
      this.saldo -= valor;
      return true;
    }

    getSaldo(): number {
      return this.saldo;
    }
  }

  class ContaCorrente extends ContaBancaria {
    private static readonly TAXA = 2.5;

    // Debita o valor + taxa operacional; se não houver saldo, nada é debitado
    sacar(valor: number): boolean {
      return super.sacar(valor + ContaCorrente.TAXA);
    }
  }

  const cb = new ContaBancaria(100);
  const cc = new ContaCorrente(100);
  console.log("Saque 50 na conta comum:", cb.sacar(50), "-> saldo", cb.getSaldo()); // 50
  console.log("Saque 50 na corrente:", cc.sacar(50), "-> saldo", cc.getSaldo()); // 47.5
  console.log("Saque 100 na corrente (sem saldo p/ taxa):", cc.sacar(100), "-> saldo", cc.getSaldo());
}

function questao5() {
  titulo("Questão 5 - Documento, Relatorio e Certificado");

  class Documento {
    imprimir(): void {
      console.log("Imprimindo documento genérico...");
    }
  }

  class Relatorio extends Documento {
    imprimir(): void {
      console.log("Imprimindo RELATÓRIO com gráficos e tabelas.");
    }
  }

  class Certificado extends Documento {
    imprimir(): void {
      console.log("Imprimindo CERTIFICADO com moldura e assinatura.");
    }
  }

  [new Documento(), new Relatorio(), new Certificado()].forEach((d) => d.imprimir());
}

// ------------------------------------------------------------
// PARTE 2 - Sobrecarga (Overload)
// ------------------------------------------------------------

function questao6() {
  titulo("Questão 6 - formatarDado");

  function formatarDado(valor: string): string;
  function formatarDado(valor: number, casasDecimais?: number): string;
  function formatarDado(valor: string | number, casasDecimais: number = 2): string {
    if (typeof valor === "string") return valor.toUpperCase();
    return valor.toFixed(casasDecimais);
  }

  console.log(formatarDado("typescript")); // TYPESCRIPT
  console.log(formatarDado(3.14159)); // 3.14
  console.log(formatarDado(3.14159, 4)); // 3.1416
}

function questao7() {
  titulo("Questão 7 - CalculadoraSimples");

  class CalculadoraSimples {
    somar(a: number, b: number): number;
    somar(a: number, b: number, c: number): number;
    somar(numeros: number[]): number;
    somar(a: number | number[], b?: number, c?: number): number {
      if (Array.isArray(a)) return a.reduce((acc, n) => acc + n, 0);
      return a + (b ?? 0) + (c ?? 0);
    }
  }

  const calc = new CalculadoraSimples();
  console.log(calc.somar(1, 2)); // 3
  console.log(calc.somar(1, 2, 3)); // 6
  console.log(calc.somar([1, 2, 3, 4, 5])); // 15
}

function questao8() {
  titulo("Questão 8 - Pessoa com construtor sobrecarregado");

  class Pessoa {
    nome: string;
    idade?: number;

    constructor(nome: string);
    constructor(nome: string, idade: number);
    constructor(nome: string, idade?: number) {
      this.nome = nome;
      this.idade = idade;
    }

    toString(): string {
      return this.idade !== undefined
        ? `${this.nome}, ${this.idade} anos`
        : `${this.nome} (idade não informada)`;
    }
  }

  console.log(new Pessoa("João").toString());
  console.log(new Pessoa("Maria", 25).toString());
}

function questao9() {
  titulo("Questão 9 - Repositorio");

  class Repositorio {
    private dados: string[] = ["Maçã", "Banana", "Maracujá", "Melancia", "Uva"];

    buscar(id: number): string;
    buscar(termo: string): string[];
    buscar(entrada: number | string): string | string[] {
      if (typeof entrada === "number") {
        const item = this.dados[entrada];
        return item ? `Item #${entrada}: ${item}` : `Item #${entrada} não encontrado`;
      }
      return this.dados.filter((d) => d.toLowerCase().includes(entrada.toLowerCase()));
    }
  }

  const repo = new Repositorio();
  console.log(repo.buscar(1)); // string
  console.log(repo.buscar("ma")); // string[]
}

function questao10() {
  titulo("Questão 10 - unir");

  function unir(a: string, b: string): string;
  function unir(a: number, b: number): number;
  function unir(a: string | number, b: string | number): string | number {
    if (typeof a === "string" && typeof b === "string") return a + b;
    if (typeof a === "number" && typeof b === "number") return a + b;
    throw new Error("Os dois parâmetros devem ser do mesmo tipo");
  }

  console.log(unir("Olá, ", "mundo!")); // Olá, mundo!
  console.log(unir(10, 5)); // 15
}

// ------------------------------------------------------------
// PARTE 3 - Generalização, Downcasting e Polimorfismo de Inclusão
// ------------------------------------------------------------

abstract class FiguraGeometrica {
  abstract calcularArea(): number;
}

class Circulo extends FiguraGeometrica {
  constructor(public raio: number) {
    super();
  }
  calcularArea(): number {
    return Math.PI * this.raio ** 2;
  }
}

class Retangulo extends FiguraGeometrica {
  constructor(public base: number, public altura: number) {
    super();
  }
  calcularArea(): number {
    return this.base * this.altura;
  }
}

// Generalização: array do tipo da superclasse com instâncias mistas
const figuras: FiguraGeometrica[] = [
  new Circulo(2),
  new Retangulo(3, 4),
  new Circulo(1),
  new Retangulo(5, 2),
];

function questao11() {
  titulo("Questão 11 - Vetor de FiguraGeometrica");
  figuras.forEach((f, i) => console.log(`Figura ${i}: área = ${f.calcularArea().toFixed(2)}`));
}

function questao12() {
  titulo("Questão 12 - Downcasting com instanceof");
  for (const f of figuras) {
    if (f instanceof Circulo) {
      // Aqui o TS já "estreita" (downcast) f para Circulo
      console.log(`Círculo de raio ${f.raio} -> área ${f.calcularArea().toFixed(2)}`);
    } else if (f instanceof Retangulo) {
      console.log(`Retângulo ${f.base}x${f.altura} -> área ${f.calcularArea()}`);
    }
  }
}

function questao13() {
  titulo("Questão 13 - AnimalBase, Bovino e Peixe");

  class AnimalBase {
    constructor(public especie: string) {}
    descrever(): string {
      return `Espécie: ${this.especie}`;
    }
  }

  class Bovino extends AnimalBase {
    constructor(especie: string, public pesoKg: number) {
      super(especie);
    }
    descrever(): string {
      return `${super.descrever()} | Bovino de ${this.pesoKg} kg`;
    }
  }

  class Peixe extends AnimalBase {
    constructor(especie: string, public aguaDoce: boolean) {
      super(especie);
    }
    descrever(): string {
      return `${super.descrever()} | Peixe de água ${this.aguaDoce ? "doce" : "salgada"}`;
    }
  }

  // Função externa que recebe o tipo genérico (superclasse)
  function processarAnimal(animal: AnimalBase): void {
    console.log("Processando ->", animal.descrever());
  }

  processarAnimal(new Bovino("Nelore", 450));
  processarAnimal(new Peixe("Tambaqui", true));
}

function questao14() {
  titulo("Questão 14 - Sistema de Vendas de Carros");

  class VendaCarro {
    constructor(protected valor: number) {}
    calculaVenda(): number {
      return this.valor;
    }
  }

  // À vista: 10% de desconto
  class Avista extends VendaCarro {
    calculaVenda(): number {
      return super.calculaVenda() * 0.9;
    }
  }

  // Cartão: até 3x sem juros; acima disso, 5% de acréscimo
  class Cartao extends VendaCarro {
    constructor(valor: number, private parcelas: number) {
      super(valor);
    }
    calculaVenda(): number {
      const base = super.calculaVenda();
      return this.parcelas <= 3 ? base : base * 1.05;
    }
  }

  // Boleto: 5% de desconto
  class Boleto extends VendaCarro {
    calculaVenda(): number {
      return super.calculaVenda() * 0.95;
    }
  }

  const vendas: VendaCarro[] = [
    new Avista(50000),
    new Cartao(50000, 2),
    new Cartao(50000, 12),
    new Boleto(50000),
  ];
  vendas.forEach((v) => console.log(`${v.constructor.name}: R$ ${v.calculaVenda().toFixed(2)}`));
}

function questao15() {
  titulo("Questão 15 - Auditoria de Tributáveis");

  interface Tributavel {
    calculaTributos(): number;
  }

  class ContaCorrente implements Tributavel {
    constructor(private saldo: number) {}
    calculaTributos(): number {
      return this.saldo * 0.01; // 1% do saldo
    }
  }

  class SeguroDeVida implements Tributavel {
    calculaTributos(): number {
      return 42; // valor fixo
    }
  }

  class AuditoriaInterna {
    private tributaveis: Tributavel[] = [];

    adicionar(t: Tributavel): void {
      this.tributaveis.push(t);
    }

    calcularTotal(): number {
      return this.tributaveis.reduce((total, t) => total + t.calculaTributos(), 0);
    }
  }

  const auditoria = new AuditoriaInterna();
  auditoria.adicionar(new ContaCorrente(1000)); // 10
  auditoria.adicionar(new ContaCorrente(2500)); // 25
  auditoria.adicionar(new SeguroDeVida()); // 42
  console.log("Total de tributos:", auditoria.calcularTotal()); // 77
}

// ------------------------------------------------------------
// PARTE 4 - Casos Avançados
// ------------------------------------------------------------

class CalculadoraFluente {
  protected resultado: number;

  constructor(inicial: number = 0) {
    this.resultado = inicial;
  }

  // Retornar `this` (e não CalculadoraFluente) é o que mantém
  // o tipo da subclasse ao longo do encadeamento (F-bounded / this-type)
  somar(n: number): this {
    this.resultado += n;
    return this;
  }

  subtrair(n: number): this {
    this.resultado -= n;
    return this;
  }

  multiplicar(n: number): this {
    this.resultado *= n;
    return this;
  }

  dividir(n: number): this {
    if (n === 0) throw new Error("Divisão por zero");
    this.resultado /= n;
    return this;
  }

  obterResultado(): number {
    return this.resultado;
  }
}

class CalculadoraCientifica extends CalculadoraFluente {
  potencia(expoente: number): this {
    this.resultado = this.resultado ** expoente;
    return this;
  }

  raizQuadrada(): this {
    this.resultado = Math.sqrt(this.resultado);
    return this;
  }
}

function questao16() {
  titulo("Questão 16 - CalculadoraFluente");
  const r = new CalculadoraFluente(10).somar(5).multiplicar(2).subtrair(10).dividir(4).obterResultado();
  console.log("((10 + 5) * 2 - 10) / 4 =", r); // 5
}

function questao17() {
  titulo("Questão 17 - CalculadoraCientifica");
  // Mistura métodos da base e da subclasse sem perder o encadeamento
  const r = new CalculadoraCientifica(2)
    .somar(1) // 3 (método da base, retorna CalculadoraCientifica)
    .potencia(2) // 9
    .somar(7) // 16
    .raizQuadrada() // 4
    .multiplicar(5) // 20
    .obterResultado();
  console.log("Resultado:", r); // 20
}

class PessoaRegistro {
  constructor(public nome: string, public cpf: string) {}
  exibir(): string {
    return `${this.nome} (CPF: ${this.cpf})`;
  }
}

class AlunoIFPI extends PessoaRegistro {
  constructor(nome: string, cpf: string, public matricula: string, public curso: string) {
    super(nome, cpf); // repassa os dados cadastrais à superclasse
  }
  exibir(): string {
    return `${super.exibir()} | Matrícula: ${this.matricula} | Curso: ${this.curso}`;
  }
}

function questao18() {
  titulo("Questão 18 - PessoaRegistro e AlunoIFPI");
  const aluno = new AlunoIFPI("Lucas", "123.456.789-00", "2026001", "Sistemas de Informação");
  console.log(aluno.exibir());
}

function questao19() {
  titulo("Questão 19 - Filtragem com instanceof");
  const registros: PessoaRegistro[] = [
    new PessoaRegistro("Joana", "111.111.111-11"),
    new AlunoIFPI("Lucas", "222.222.222-22", "2026001", "ADS"),
    new PessoaRegistro("Pedro", "333.333.333-33"),
    new AlunoIFPI("Marina", "444.444.444-44", "2026002", "Sistemas de Informação"),
  ];

  for (const r of registros) {
    if (r instanceof AlunoIFPI) {
      console.log(`Aluno: ${r.nome} | Matrícula: ${r.matricula} | Curso: ${r.curso}`);
    }
  }
}

function questao20() {
  titulo("Questão 20 - RequisicaoHttp e RequisicaoSegura");

  class RequisicaoHttp {
    enviar(dados: string): void {
      console.log(`[HTTP] Enviando: ${dados}`);
    }
  }

  class RequisicaoSegura extends RequisicaoHttp {
    enviar(dados: string): void {
      // Regra de segurança: remove tags <script> e codifica em Base64
      const limpo = dados.replace(/<\/?script[^>]*>/gi, "");
      const codificado = Buffer.from(limpo, "utf-8").toString("base64");
      console.log("[HTTPS] Aplicando sanitização e criptografia...");
      super.enviar(codificado); // reutiliza o comportamento base
    }
  }

  const reqs: RequisicaoHttp[] = [new RequisicaoHttp(), new RequisicaoSegura()];
  reqs.forEach((r) => r.enviar("usuario=admin<script>alert(1)</script>"));
}

// ------------------------------------------------------------
// Execução de todos os testes
// ------------------------------------------------------------
[
  questao1, questao2, questao3, questao4, questao5,
  questao6, questao7, questao8, questao9, questao10,
  questao11, questao12, questao13, questao14, questao15,
  questao16, questao17, questao18, questao19, questao20,
].forEach((q) => q());