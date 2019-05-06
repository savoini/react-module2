import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';

import logo from '../../assets/logo.png';
import { Container, Form } from './styles';
import CompareList from '../../components/CompareList';

class Main extends Component {
  state = {
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  };

  handleAddRepository = async (e) => {
    e.preventDefault();
    try {
      const { repositoryInput, repositories } = this.state;
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      repositories.push(repository);

      this.setState({ repositoryError: false, repositoryInput: '', repositories });
    } catch (err) {
      this.setState({ repositoryError: true });
    }
  };

  render() {
    const { repositoryError, repositoryInput, repositories } = this.state;
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

          <button type="submit">OK</button>
        </Form>
        <CompareList repositories={repositories} />
      </Container>
    );
  }
}

export default Main;
