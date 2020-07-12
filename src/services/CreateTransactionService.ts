import { getCustomRepository, getRepository } from 'typeorm';
import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

import TransactionsRepository from '../repositories/TransactionsRepository';

interface RequestDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: RequestDTO): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);

    // validar transações do tipo 'outcome'.
    const { total } = await transactionsRepository.getBalance();

    if (value > total && type === 'outcome') {
      throw new AppError('Saldo insuficiente para realizar operação!');
    }

    // verificar se a categoria existe
    let categoryTransaction = await categoriesRepository.findOne({
      where: { title: category },
    });

    if (!categoryTransaction) {
      // se não existir, Criar category
      categoryTransaction = categoriesRepository.create({ title: category });

      await categoriesRepository.save(categoryTransaction);
    }

    const newTransaction = transactionsRepository.create({
      title,
      value,
      type,
      category: categoryTransaction,
    });

    await transactionsRepository.save(newTransaction);

    return newTransaction;
  }
}

export default CreateTransactionService;
