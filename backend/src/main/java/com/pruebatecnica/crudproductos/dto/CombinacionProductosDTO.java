package com.pruebatecnica.crudproductos.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CombinacionProductosDTO {

    private List<String> productos;
    private BigDecimal sumaPrecios;

    public List<Object> toListFormat() {
        List<Object> resultado = new java.util.ArrayList<>(productos);
        resultado.add(sumaPrecios);
        return resultado;
    }
}
