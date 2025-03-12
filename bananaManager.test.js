import { bananaManager } from './bananaManager';

describe('Banana Manager Tests', () => {
  let manager;

  beforeEach(() => {
    manager = bananaManager();
  });

  describe('addBanana', () => {
    it('should add a new banana with default freshness', () => {
      manager.addBanana();
      const bananas = manager.getBananas();
      expect(bananas.length).toBe(1);
      expect(bananas[0].freshness).toBe(10);
    });

    it('should throw an error if freshness is out of range', () => {
      expect(() => manager.addBanana(-1)).toThrow('Свежесть банана должна быть от 0 до 10');
      expect(() => manager.addBanana(11)).toThrow('Свежесть банана должна быть от 0 до 10');
    });
  });

  describe('removeBanana', () => {
    it('should remove a banana by ID', () => {
      manager.addBanana();
      const bananas = manager.getBananas();
      const id = bananas[0].id;
      manager.removeBanana(id);
      expect(manager.getBananas().length).toBe(0);
    });

    it('should not throw an error if banana does not exist', () => {
      expect(() => manager.removeBanana(999)).not.toThrow();
    });
  });

  describe('getBananas', () => {
    it('should return all bananas', () => {
      manager.addBanana(5);
      manager.addBanana(7);
      const bananas = manager.getBananas();
      expect(bananas.length).toBe(2);
      expect(bananas[0].freshness).toBe(5);
      expect(bananas[1].freshness).toBe(7);
    });
  });

  describe('distributeBananas', () => {
    it('should distribute bananas users', () => {
      manager.addBanana(5);
      manager.addBanana(7);
      const users = ['Alice', 'Bob'];
      const distributed = manager.distributeBananas(users);
      expect(distributed.length).toBe(2);
      expect(distributed[0].user).toBe('Alice');
      expect(distributed[1].user).toBe('Bob');
    });

    it('should throw an error if not enough bananas for users', () => {
      manager.addBanana();
      const users = ['Alice', 'Bob', 'Charlie'];
      expect(() => manager.distributeBananas(users)).toThrow('Недостаточно бананов для всех пользователей');
    });
  });

  describe('sortBananasByFreshness', () => {
    it('should sort bananas by freshness in order', () => {
      manager.addBanana(5);
      manager.addBanana(7);
      manager.addBanana(3);
      manager.sortBananasByFreshness();
      const bananas = manager.getBananas();
      expect(bananas[0].freshness).toBe(7);
      expect(bananas[1].freshness).toBe(5);
      expect(bananas[2].freshness).toBe(3);
    });
  });

  describe('removeSpoiledBananas', () => {
    it('should remove spoiled bananas (freshness <= 0)', () => {
      manager.addBanana(0);
      manager.addBanana(5);
      const bananas = manager.getBananas();
      bananas[0].freshness = -1;
      const spoiled = manager.removeSpoiledBananas();
      const remainingBananas = manager.getBananas();
      expect(spoiled.length).toBe(1);
      expect(remainingBananas.length).toBe(1);
      expect(remainingBananas[0].freshness).toBe(5);
    });
  });

  describe('getBananaStatistics', () => {
    it('should return total count and average freshness', () => {
      manager.addBanana(5);
      manager.addBanana(7);
      const stats = manager.getBananaStatistics();
      expect(stats.total).toBe(2);
      expect(stats.averageFreshness).toBe(6);
    });

    it('should return 0 for total and average if no bananas', () => {
      const stats = manager.getBananaStatistics();
      expect(stats.total).toBe(0);
      expect(stats.averageFreshness).toBe(0);
    });
  });

  describe('getActionsLog', () => {
    it('should log all actions', () => {
      manager.addBanana(5);
      const bananas = manager.getBananas();
      const id = bananas[0].id;
      manager.removeBanana(id);
      const log = manager.getActionsLog();
      expect(log.length).toBe(2);
      expect(log[0].type).toBe('ADD');
      expect(log[1].type).toBe('REMOVE');
    });
  });
});