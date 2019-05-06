import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';

import logo from '../../assets/logo.png';
import { Container, Form } from './styles';
import CompareList from '../../components/CompareList';

class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  };

  componentDidMount() {
    const repositories = localStorage.getItem('github_repo');
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  handleAddRepository = async (e) => {
    e.preventDefault();
    const { repositoryInput } = this.state;
    await this.loadRepository(repositoryInput);
  };

  refreshRepository = async (repository) => {
    await this.loadRepository(repository.full_name);
  };

  findRepository = async (repository) => {
    const { repositories } = this.state;

    let i = -1;
    repositories.forEach((repo, index) => {
      if (repo.id === repository.id) {
        i = index;
      }
    });
    return i;
  };

  deleteRepository = async (repository) => {
    if (repository) {
      const { repositories: repos } = this.state;
      const repositories = repos.filter(repo => repo.id !== repository.id);

      localStorage.setItem('github_repo', JSON.stringify(repositories));
      this.setState({ repositories });
    }
  };

  loadRepository = async (name) => {
    this.setState({ loading: true });
    try {
      const { data: repository } = await api.get(`/repos/${name}`);
      repository.lastCommit = moment(repository.pushed_at).fromNow();

      const { repositories } = this.state;

      const index = await this.findRepository(repository);
      if (index >= 0) {
        repositories[index] = repository;
      } else {
        repositories.push(repository);
      }

      localStorage.setItem('github_repo', JSON.stringify(repositories));
      this.setState({ repositoryError: false, repositoryInput: '', repositories });
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      loading, repositoryError, repositoryInput, repositories,
    } = this.state;
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="Usuário/repositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />

          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>
        <CompareList
          repositories={repositories}
          onRefresh={this.refreshRepository}
          onDelete={this.deleteRepository}
        />
      </Container>
    );
  }
}

export default Main;
