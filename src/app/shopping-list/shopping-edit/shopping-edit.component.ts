import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subcripcion: Subscription;
  editMode = false;
  editedItemIndex: number;
  editItemIngrediente: Ingredient;
  @ViewChild('f') slForm: NgForm;

  constructor(private shoppinlistService: ShoppingListService) { }

  ngOnInit() {
    this.subcripcion = this.shoppinlistService.editarSubjec.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editMode = true;
        this.editItemIngrediente = this.shoppinlistService.getIngredientebyIndex(index);
        this.slForm.setValue({
          name: this.editItemIngrediente.name,
          amount: this.editItemIngrediente.amount
        })
      }
    );
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const nuevoIngrediente = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppinlistService.actualizarIngredienteByID(
        this.editedItemIndex,
        nuevoIngrediente
      );
    } else {
      this.shoppinlistService.addIngredient(nuevoIngrediente);
    }
    this.editMode=false;
    this.slForm.reset();
  }
  ngOnDestroy() {
    this.subcripcion.unsubscribe();
  }
  limpiartexto() {
    this.editMode=false;    
    this.slForm.reset();
  }
  deleteIngrediente(){
    this.shoppinlistService.deleteIngredienById(this.editedItemIndex);
    this.limpiartexto();
  }
}
