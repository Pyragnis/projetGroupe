import React, { useState } from 'react'; // Import de useState
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import styled from 'styled-components/native';
import { addCategory } from '../../actions/categoryActions';
import Icon from 'react-native-vector-icons/FontAwesome';

const Index = ({ navigation }) => { // Ajout de la prop navigation
  const [categoryName, setCategoryName] = useState('');
  const [filterText, setFilterText] = useState('');
  const dispatch = useDispatch();
  const categories = useSelector(state => state.categoryReducer.categories);

  const handleInputChange = (text) => {
    setCategoryName(text);
  };

  const handleFilterChange = (text) => {
    setFilterText(text);
  };

  const handleSubmit = () => {
    const newCategory = {
      id: new Date().getTime(),
      name: categoryName
    };
    dispatch(addCategory(newCategory));
    setCategoryName('');
  };

  const filteredCategories = categories.filter(category => category.name && category.name.toLowerCase().includes(filterText.toLowerCase())); // Simplification du code

  return (
    <Container>
      <FormContainer>
        <InputLabel>Ajouter une catégorie</InputLabel> {/* Utilisation d'un composant Label créé pour l'occasion */}
        <CustomInput
          label="Nom de la catégorie"
          value={categoryName}
          onChangeText={handleInputChange}
        />
        <AddButton mode="contained" onPress={handleSubmit}>
          Ajouter
        </AddButton>
      </FormContainer>
      <BackgroundImage source={require('../../../public/asset/logo1.png')}>
        <CategoryList>
          <ScrollView>
            {filteredCategories.map(category => (
              <Category key={category.id}>{category.name}</Category>
            ))}
          </ScrollView>
        </CategoryList>
        <TouchableOpacity style={{ position: 'absolute', bottom: 20, left: 20 }} onPress={() => setShowAlert(false)}>
  <Icon name="arrow-left" size={30} color="#fff" />
</TouchableOpacity>
      </BackgroundImage>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
  color: #FFF; /* Changement de la couleur du texte */
`;

const FormContainer = styled.View`
  margin: 20px;
`;

const InputLabel = styled.Text`
  font-size: 18px;
  margin-bottom: 5px;
  color: #FFF; /* Changement de la couleur du texte */
`;

const CustomInput = styled(TextInput)`
  margin-bottom: 20px;
`;

const AddButton = styled(Button)`
  margin-top: 10px;
  background-color: #4CAF50;
`;

const BackgroundImage = styled.ImageBackground`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const CategoryList = styled.View`
  flex: 1;
  margin-top: 10px;
`;

const Category = styled.Text`
  font-size: 16px;
  margin-bottom: 5px;
  color: #FFF; /* Changement de la couleur du texte */
`;

const BackButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 20px;
  left: 20px;
`;

export default Index;
